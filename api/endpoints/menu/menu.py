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
			"gluten_free, vegetarian, calories, price, available, type, image " +
				"FROM menu, item_type " +
				"WHERE item_type.id = menu.food_type")
		# gets the result from the database
		return jsonify(data={"items" : result})

	else:  # not implemented yet
		# add the abilty to handle multiple arguments in the querys
		# for example get only sides ect by adding '?item_type=side'
		return jsonify(Error="arguments not implemented yet")

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
