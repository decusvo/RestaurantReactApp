from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from . import validate_orders
from common import connector


bp = Blueprint("order blueprint", __name__)


@bp.route("/create_order", methods=["POST"])
def create_order():
	error = validate_orders.validate(request)
	if error:
		return(error)

	table_num = int(request.json.get("table_num"))
	items = request.json.get("items")
	customer = request.json.get("customer")

	query = "INSERT INTO orders (table_number, ordered_time, cust_id) VALUES (%s, NOW(), %s) RETURNING id"
	result = connector.execute_query(query, (int(table_num), customer))
	order_id = result[0]

	items_added = []

	for menu_item_id in items:
		try:
			query = "INSERT INTO ordered_items (order_id, menu_item_id) VALUES (%s, %s)"
			connector.execute_insert_query(query, (order_id, menu_item_id))
			items_added.append(menu_item_id)
		except:
			error_msg = "Problem adding items to ordered_items, likely an invalid menu_item_id"
			return jsonify({"success" : False, "message" : error_msg})

	return jsonify(data={"success" : True, "order_id" : order_id, "items_added" : items_added})

@bp.route("/order_event", methods=["POST"])
def order_event():
	error =	validate_orders.validate_order_event(request)
	if error:
		return(error)

	order_id = request.json.get("order_id")
	event = request.json.get("order_event")

	query = "INSERT INTO order_events(order_id, event) VALUES(%s, %s)"
	connector.execute_insert_query(query, (order_id, event))

	return jsonify({"success" : True})

@bp.route("/get_orders", methods=["POST"])
def get_orders():
	error = validate_orders.validate_get_order(request)
	if error:
		return (error)

	states = request.json.get("states")

	# handles case for getting all orders:
	if len(states) == 0:
		query = "SELECT json_agg (order_list) FROM " \
					"(SELECT id, table_number, state, ordered_time, price, items " \
					"FROM orders, total_order_price, ordered_item_array " \
					"WHERE orders.id = total_order_price.order_id " \
					"AND orders.id = ordered_item_array.order_id) " \
				"AS order_list;"
		result = connector.execute_query(query)
	else:
		query = "SELECT json_agg (order_list) FROM " \
					"(SELECT id, table_number, state, ordered_time, price, items " \
					"FROM orders, total_order_price, ordered_item_array " \
					"WHERE orders.id = total_order_price.order_id " \
					"AND orders.id = ordered_item_array.order_id " \
					"AND state = ANY('{"
		query += ", ".join(states) + "}')) AS order_list;"
		result = connector.execute_query(query)
	return jsonify(data={"orders" : result[0][0]})


@bp.route("/get_cust_order", methods=["POST"])
def get_cust_order():
	id = request.json.get("custId")

	query = "SELECT json_agg (order_list) FROM " \
				"(SELECT id, table_number, state, ordered_time, price, items " \
				"FROM orders, total_order_price, ordered_item_array " \
				"WHERE orders.id = total_order_price.order_id " \
				"AND orders.id = ordered_item_array.order_id " \
				"AND orders.cust_id = %s) " \
			"AS order_list;"
	result = connector.execute_query(query, (id,))
	return jsonify(data={"orders":result[0][0]})
