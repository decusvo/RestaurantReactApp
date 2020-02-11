from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector

connection = connector.get_connection()
cur = connection.cursor()

bp = Blueprint("order blueprint", __name__)


@bp.route("/create_order")
def create_order():
	error = validate_order_request(request)
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


def validate_order_request(request):
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
	cur.execute(query, (table_num,))
	if not cur.fetchall():
		error_msg =  "Given table number is not in table_detail"
		return jsonify(error={"success" : False, "message" : error_msg})

	return None

