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
	
	#when the event "cooked" happens it will create a waiter notification, that the order
	#is ready to be delivered
	if event == "cooked":
		# retrieving necessary information for waiter notification  
		query = "SELECT cust_id FROM orders WHERE id = %s"
		result[0][0] = connector.json_select(query,(order_id))
		customer_id = result[0][0].get()
		query = "SELECT table_number FROM orders WHERE id = %s"
		result[0][0] = connector.json_select(query,(order_id))
		table_number = result[0][0].get()
		query = "SELECT waiter_od FROM table_details WHERE table_number = %s"
		result[0][0] = connector.json_select(query,(table_number))
		waiter_id = result[0][0].get()
		message = "order number " + order_id + " is ready to be delivered"	
		# the json to be passed to add_waiter_notification()
		payload = {"waiter_id" : waiter_id, 
							"customer_id" : customer_id,
							"message" : message}
		#api call to create notification
		r = requests.post("http://localhost:5000/add_waiter_notification",json= payload)
	return jsonify({"success" : True})

@bp.route("/get_orders", methods=["POST"])
def get_orders():
	error = validate_orders.validate_get_order(request)
	if error:
		return (error)

	states = request.json.get("states")

	# handles case for getting all orders:
	if len(states) == 0:
		query = "SELECT json_agg (order_list) FROM (SELECT id, table_number, state FROM orders) AS order_list;"
		result = connector.execute_query(query)
	else:
		query = "SELECT json_agg (order_list) FROM (SELECT id, table_number, state FROM orders WHERE state = ANY('{"
		query += ", ".join(states) + "}')) AS order_list;"
		result = connector.execute_query(query)
	print(result)
	return jsonify(data={"orders" : result[0][0]})
