from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
try:
	from . import validate_notifications as vn
except:
	import validate_notifications as vn
	
from common import connector


bp = Blueprint("notification blueprint", __name__)


@bp.route("/add_waiter_notification", methods=["POST"])
def add_waiter_notification():
	error = vn.validate_notification(request)
	if error:
		return(error)
	
	message = request.json.get("message")
	waiter_id = request.json.get("waiter_id")
	customer_id = request.json.get("customer_id")

	query = "INSERT INTO waiter_notifications(waiter_id, customer_id, message) VALUES(%s, %s, %s)"
	connector.execute_insert_query(query, (waiter_id, customer_id, message))

	return jsonify(data={"success" : True})


@bp.route("/add_customer_notification", methods=["POST"])
def add_customer_notification():
	error = vn.validate_notification(request)
	if error:
		return(error)
	
	message = request.json.get("message")
	waiter_id = request.json.get("waiter_id")
	customer_id = request.json.get("customer_id")

	query = "INSERT INTO customer_notifications(waiter_id, customer_id, message) VALUES(%s, %s, %s)"
	connector.execute_insert_query(query, (waiter_id, customer_id, message))

	return jsonify(data={"success" : True})
