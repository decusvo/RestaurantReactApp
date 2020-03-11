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

