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

    state = request.json.get("state")
    # if they request all orders no matter the state
    if state == "all":
        # curl -X POST -H "Content-Type: application/json" -d '{"state":"all"}' 127.0.0.1:5000/get_orders
        query = "SELECT id, table_number, state FROM orders"
        result = connector.json_select(query)
    else:
        # curl -X POST -H "Content-Type: application/json" -d '{"state":"start"}' 127.0.0.1:5000/get_orders
        query = "SELECT id, table_number, state FROM orders WHERE state = '{}'".format(state)
        result = connector.json_select(query)


    return jsonify(data=result)


@bp.route("/update_order_state",methods=["POST"])
def change_cooking_state():
	#default state of all orders is start
	#kitchen will only be able to change state to 'cooking' and 'ready_to_deliver'
	newState = request.json.get("newState")
	orderId = request.json.get("Id")
	print(newState)
	#Prevent kitchen staff from setting orders into states that they have no control over
	if (newState != "cooking") or (newState != "ready_to_deliver"):
		return jsonify(error={"success":False, "message":"Please enter a valid order state"})
	else:
		query = "UPDATE orders SET state = %s WHERE id = %s"
		result=connector.execute_insert_query(query,(newState,Id))
		print(result)
		if result == False:
			return jsonify(error={"success":False, "message":"Error order does not exist"})
		return jsonify(data={"success":True})

