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
	

