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

	query = "INSERT INTO orders (table_number) VALUES (%s) RETURNING id"
	result = connector.execute_query(query, (int(table_num),))
	print(result)
	order_id = result[0]

	items_added = []

	for menu_item_id in items:
		try:
			query = "INSERT INTO ordered_items (order_id, menu_item_id) VALUES (%s, %s)"
			connector.execute_query(query, (order_id, menu_item_id))
			items_added.append(menu_item_id)
		except:
			error_msg = "Problem adding items to ordered_items, likely an invalid menu_item_id"
			connection.commit()
			return jsonify({"success" : False, "message" : error_msg})

	return jsonify(data={"success" : True, "order_id" : order_id, "items_added" : items_added})

@bp.route("/order_event", methods=["POST"])
def order_event():
	error =	validate_orders.validate_order_event(request)
	if error:
		return(error)

	return jsonify({"success" : True})

@bp.route("/get_orders", methods=["POST"])
def get_orders():
	error = validate_orders.validate_get_order(request)
	if error:
		return (error)

	states = request.json.get("states")
	# if they request all orders no matter the state
	if len(states) == 0:
		# curl -X POST -H "Content-Type: application/json" -d '{"state":"all"}' 127.0.0.1:5000/get_orders
		query = "SELECT id, table_number, state FROM orders"
		result = connector.execute_query(query)
	else:
		query = "SELECT id, table_number, state FROM orders WHERE state = ANY('{"
		query += ", ".join(states) + "}');"
		print(query)
		result = connector.execute_query(query)

	return jsonify(data={"orders" : result})
