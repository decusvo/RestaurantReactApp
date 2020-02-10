from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector

connection = connector.get_connection()
cur = connection.cursor()

bp = Blueprint("order blueprint", __name__)

@bp.route("/order")
def create_order():
	#TODO REWRITE TO TAKE SINGLE JSON OBJECT ARGUMENT
	if len(request.args) != 2:
		return "TOO FEW ARGS"
	elif "items" not in request.args:
		return "MISSING ARGUMENT: items"
	elif "table_num" not in request.args:
		return "MISSING ARGUMENT: table_num"
	return request.args["items"]
	

