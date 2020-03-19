from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector

def validate_notification(request):
	if "message" not in request.json:
		error_msg = "Expected 'message' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})

	if "waiter_email" not in request.json:
		error_msg = "Expected 'waiter_email' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	if "customer_email" not in request.json:
		error_msg = "Expected 'customer_email' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	message = request.json.get("message")
	waiter_email = request.json.get("waiter_email")
	customer_email = request.json.get("customer_email")

	if len(message) > 256:
		error_msg = "Given message was too long, should be fewer than 256 characters"
		return jsonify(error={"success" : False, "message" : error_msg})

	r = connector.execute_query("SELECT * FROM waiter WHERE email=%s", (waiter_email,))
	if r is None:
		error_msg = "Given waiter email does not appear in waiter table"
		return jsonify(error={"success" : False, "message" : error_msg})

	r = connector.execute_query("SELECT * FROM customer WHERE email=%s", (customer_email,))
	if r is None:
		error_msg = "Given customer email does not appear in customer table"
		return jsonify(error={"success" : False, "message" : error_msg})

	return None


def validate_get_waiter_notifications(request):
	if "waiter_email" not in request.json:
		error_msg = "Expected 'waiter_email' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})

	waiter_email = request.json.get("waiter_email")
	
	r = connector.execute_query("SELECT * FROM waiter WHERE email=%s", (waiter_email,))
	if r is None:
		error_msg = "Given waiter_email does not appear in waiter table"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	return None


def validate_clear_waiter_notifications(request):
	if "waiter_email" not in request.json:
		error_msg = "Expected 'waiter_email' argument, none was given"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	waiter = request.json.get("waiter_email")
	
	r = connector.execute_query("SELECT * FROM waiter WHERE email=%s", (waiter,))
	if r is None:
		error_msg = "Given waiter email does not appear in waiter table"
		return jsonify(error={"success" : False, "message" : error_msg})
	
	return None
