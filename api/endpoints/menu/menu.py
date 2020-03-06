from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import psycopg2
from common import connector


bp = Blueprint("menu blueprint", __name__)


@bp.route("/menu", methods=["POST"])
def menu():
	#try and get the variable from the json
	try:
		getAll = request.json.get("getAll")
		if getAll != False || getAll != True:
			jsonify(error={"success":False, "message":"getAll was not a boolean"})
	except AttributeError as error:	# if getAll not provided handle error thrown
		getAll = None

	if getAll == None or getAll == False:	# if there are no arguments select everything
		#  gets the whole menu from the database and gets the menu item type i.e. side, main ect
		#  this sql query returns the result as an already formatted json
		result = connector.json_select("SELECT menu.id, name, description, vegan, " +
			"gluten_free, vegetarian, calories, price, available, type, image " +
				"FROM menu, item_type " +
				"WHERE item_type.id = menu.food_type " +
				"AND menu.available = true")
		# gets the result from the database
		return jsonify(data={"items" : result})

	elif getAll == True:
		result = connector.json_select("SELECT menu.id, name, description, vegan, " +
			"gluten_free, vegetarian, calories, price, available, type, image " +
				"FROM menu, item_type " +
				"WHERE item_type.id = menu.food_type ")
		return jsonify(data={"items" : result})

@bp.route("/menu_item_availability", methods=["POST"])
def changeAvailablty():
    newState = request.json.get("newState")
    menuId = request.json.get("menuId")
    query = "UPDATE menu SET available = %s WHERE id = (%s)"
    result=connector.execute_insert_query(query,(newState,menuId))
    if result == False:
        return jsonify(error={"success":False, "message":"Error MenuId does not exist"})
    return jsonify(data={"success":True})
# to Test this endpoint use
# curl -X POST -H "Content-Type: application/json" -d '{"menuId": "1","newState":"False"}' 127.0.0.1:5000/menu_item_availability
