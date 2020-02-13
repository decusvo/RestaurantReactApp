from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector


def validate(request):
	if "table_num" not in request.json:
		error_msg = "Expected 'table_num' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})

	if "items" not in request.json:
		error_msg = "Expected 'items' field, non was given"
		return jsonify(error={"success" : False, "message" : error_msg})

	table_num = int(request.json.get("table_num"))
	items = request.json.get("items")

	if not isinstance(items, (list)):
		error_msg = "expected 'items' to be list"
		return jsonify(error={"success" : False, "message" : error_msg})

	if len(items) > 100:
		error_msg = "'items' is more than 100 items, please shorten it"
		return jsonify(error={"success" : False, "message" : error_msg})

	query = "SELECT * FROM table_details WHERE table_number = %s"
	result = connector.execute_query(query, (table_num,))
	if not result:
		error_msg =  "Given table number is not in table_detail"
		return jsonify(error={"success" : False, "message" : error_msg})

	query = "SELECT id FROM menu"
	result = connector.execute_query(query)
	for id in items:
		if id not in result:
			error_msg = "Invalid menu_item_id given in 'items' list"
			return jsonify(error={"success" : False, "message" : error_msg})

	return None

def validate_order_event(request):

	if "order_id" not in request.json:
		error_msg = "Expected 'order_id', was not found"
		return jsonify({"success" : False, "message" : error_msg})

	if "order_event" not in request.json:
		error_msg = "Expected 'order_event', was not found"
		return jsonify({"success" : False, "message" : error_msg})

	order_id = request.json.get("order_id")
	event = request.json.get("order_event")

	valid_events = [
		"request",
		"confirm",
		"start_cook",
		"deliver",
		"pay",
		"cancel",
	]

	if event not in valid_events:
		error_msg = "given event is not a valid event type, see this objects 'valid_events'"
		error_msg += " for a list of valid events"
		return jsonify({"success" : False, "message" : error_msg, "valid_events" : valid_events})

	result = connector.execute_query("SELECT * FROM orders WHERE id=%s", (order_id,))
	if not result:
		error_msg = "Invalid order_id, given order_id is not in orders table"
		return jsonify({"success" : False, "message" : error_msg})

def validate_get_order(request):
    valid_states = [
        "start",
        "requested",
        "confirm",
        "cooking",
        "ready_to_deliver",
        "delivered",
        "paid",
        "cancelled",
        "all"   # added this if they want the orders no matter the state
    ]
    if request.json is None:
        error_msg = "Expected json object, was not found"
        return jsonify({"success": False, "message": error_msg})
    elif "state" not in request.json:
        error_msg = "Expected 'state', and was not found"
        return jsonify({"success": False, "message": error_msg})
    elif request.json.get("state") not in valid_states:
        error_msg = "Invalid 'state' of order was entered "
        error_msg += "the list of all valid states are "
        error_msg += ", ".join(map(str, valid_states))
        return jsonify({"success": False, "message": error_msg})

    return None
