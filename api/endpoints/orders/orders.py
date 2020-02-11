from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from . import validate_orders
from common import connector

connection = connector.get_connection()
cur = connection.cursor()

bp = Blueprint("order blueprint", __name__)


@bp.route("/create_order", methods=["POST"])
def create_order():
	error = validate_orders.validate(request)
	if error:
		return(error)
	
	table_num = int(request.json.get("table_num"))
	items = request.json.get("items")

	query = "INSERT INTO orders (table_number) VALUES (%s) RETURNING id"
	cur.execute(query, (int(table_num),))
	connection.commit()
	order_id = cur.fetchall()[0]

	items_added = []

	for menu_item_id in items:
		try:
			query = "INSERT INTO ordered_items (order_id, menu_item_id) VALUES (%s, %s)"
			cur.execute(query, (order_id, menu_item_id))
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

