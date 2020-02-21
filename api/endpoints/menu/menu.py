from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import psycopg2
from common import connector


bp = Blueprint("menu blueprint", __name__)


@bp.route("/menu", methods=["POST"])
def menu():
	print(request.json)
	if len(request.args) == 0:	# if there are no arguments select everything
		#  gets the whole menu from the database and gets the menu item type i.e. side, main ect
		#  this sql query returns the result as an already formatted json
		result = connector.json_select("SELECT menu.id, name, description, vegan, " +
			"gluten_free, vegetarian, calories, price, available, type " +
				"FROM menu, item_type " +
				"WHERE item_type.id = menu.food_type")
		# gets the result from the database
		return jsonify(data={"items" : result})

	else:  # not implemented yet
		# add the abilty to handle multiple arguments in the querys
		# for example get only sides ect by adding '?item_type=side'
		return jsonify(Error="arguments not implemented yet")

@bp.route("/menu/<string:menu.id>", methods=["POST"])
#default state of available is TRUE, therefore will only change state to FALSE for time being
#Does not take in account that an item may already be set to unavailable
def availabilityChange(menu_Id):
	#generate query string to update the menu item
	 query = "UPDATE menu SET available = FALSE WHERE menu.id = (%s)"
	 result = connector.execute_query(query, (menu_Id,))
	 return jsonify(data={"menu item of id " : menu.id + "made unavailable"})
	 #add validation to check if valid menu id has been passed