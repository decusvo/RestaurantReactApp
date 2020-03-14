from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector

def validate_notification(request):
	if "message" not in request.json:
		error_msg = "Expected 'message' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})

	if "waiter_id" not in request.json:
		error_msg = "Expected 'waiter_id' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	if "customer_id" not in request.json:
		error_msg = "Expected 'customer_id' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	message = request.json.get("message")
	waiter_id = request.json.get("waiter_id")
	customer_id = request.json.get("customer_id")

	if len(message) > 256:
		error_msg = "Given message was too long, should be fewer than 256 characters"
		return jsonify(error={"success" : False, "message" : error_msg})

	return None

def validate_get_waiter_notifications(request):
	if "waiter_id" not in request.json:
		error_msg = "Expected 'waiter_id' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})

	waiter_id = request.json.get("waiter_id")
	
	r = connector.execute_query("SELECT * FROM waiter WHERE waiter_id=%s", (waiter_id,))
	if r is None:
		error_msg = "Given waiter id does not appear in waiter table"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	return None
		
	
def validate_get_customer_notifications(request):
	if "customer" not in request.json:
		error_msg = "Expected 'customer' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	customer = request.json.get("customer")
	
	r = connector.execute_query("SELECT * FROM customer WHERE email=%s", (customer,))
	if r is None:
		error_msg = "Given customer email does not appear in customer table"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	return None

def validate_clear_customer_notifications(request):
	if "customer" not in request.json:
		error_msg = "Expected 'customer' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	customer = request.json.get("customer")
	
	r = connector.execute_query("SELECT * FROM customer WHERE email=%s", (customer,))
	if r is None:
		error_msg = "Given customer email does not appear in customer table"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	return None


def validate_clear_waiter_notifications(request):
	if "waiter_id" not in request.json:
		error_msg = "Expected 'waiter' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	waiter = request.json.get("waiter_id")
	
	r = connector.execute_query("SELECT * FROM waiter WHERE waiter_id=%s", (waiter,))
	if r is None:
		error_msg = "Given waiter email does not appear in waiter table"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	return None
