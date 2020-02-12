from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import psycopg2
from common import connector

connection = connector.get_connection()
cur = connection.cursor()

bp = Blueprint("menu blueprint", __name__)

@bp.route("/test")
def test():
	return "testing new test"

@bp.route("/menu")
def menu():
	if len(request.args) == 0:	# if there are no arguments select everything
		#  gets the whole menu from the database and gets the menu item type i.e. side, main ect
		#  this sql query returns the result as an already formatted json
		cur.execute("SELECT TO_JSON(t) " +
			"FROM (SELECT menu.id, name, description, vegan, " +
			"gluten_free, vegetarian, calories, price, available, type " +
				"FROM menu, item_type " +
				"WHERE item_type.id = menu.food_type)" +
			"t;")
		# gets the result from the database
		result = cur.fetchall()
		return jsonify(data={"items" : result})

	else:  # not implemented yet
		# add the abilty to handle multiple arguments in the querys
		# for example get only sides ect by adding '?item_type=side'
		return jsonify(Error="arguments not implemented yet")

