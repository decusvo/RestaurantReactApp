from flask import Flask, request, jsonify, Blueprint
import psycopg2
from common import connector


bp = Blueprint("signup blueprint", __name__)

@bp.route("/signup", methods=["POST"])
def sign_up():
	#  Get the details of the user from a post request as a json
	email = request.json.get('email')
	password = request.json.get('password')
	firstname = request.json.get('firstname')
	lastname = request.json.get('lastname')

	try:
		query = "INSERT INTO customer VALUES (%s, %s, %s, %s)"
		connector.execute_query(query, (email, firstname, lastname, password))
	except psycopg2.errors.UniqueViolation:
		# if the sql INSERT doesn't work it reverts the statement to prevent data corruption
		connector.execute_query("ROLLBACK")
		return jsonify(success = False)

	connection.commit()

	return jsonify(success = True)


#  Temporary test commands

#  curl -d '{"email":"testing@test.com", "password":"password", "firstname":"DELETE", "lastname":"ME"}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/sign_up"
#  this should return a json saying if it was successful or not