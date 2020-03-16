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

@bp.route("/get_waiter_notifications", methods=["POST"])
def get_waiter_notifications():
	error = vn.validate_get_waiter_notifications(request)
	if error:
		return(error)

	waiter_id = request.json.get("waiter_id")

	query = "SELECT * FROM waiter_notifications WHERE waiter_id=%s"
	notifications = connector.execute_query(query, (waiter_id,))
	
	return jsonify(data={"notifications" : notifications, "success" : True})
	
		
@bp.route("/get_customer_notifications", methods=["POST"])
def get_customer_notifications():
	error = vn.validate_get_customer_notifications(request)
	if error:
		return(error)

	customer = request.json.get("customer")

	query = "SELECT * FROM customer_notifications WHERE customer_id=%s"
	notifications = connector.execute_query(query, (customer,))
	
	return jsonify(data={"notifications" : notifications, "success" : True})


@bp.route("/clear_customer_notifications", methods=["POST"])
def clear_customer_notifications():
	error = vn.validate_clear_customer_notifications(request)
	if error:
		return(error)

	customer = request.json.get("customer")

	query = "DELETE FROM customer_notifications WHERE customer_id=%s"
	connector.execute_insert_query(query, (customer,))

	return jsonify(data={"success" : True})


@bp.route("/clear_waiter_notifications", methods=["POST"])
def clear_waiter_notifications():
	error = vn.validate_clear_waiter_notifications(request)
	if error:
		return(error)

	waiter = request.json.get("waiter_id")

	query = "DELETE FROM waiter_notifications WHERE waiter_id=%s"
	connector.execute_insert_query(query, (waiter,))

	return jsonify(data={"success" : True})
