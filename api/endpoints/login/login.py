from flask import Flask, request, jsonify, Blueprint, session
import psycopg2
from common import connector


connection = connector.get_connection()
cur = connection.cursor()

bp = Blueprint("login blueprint", __name__)

def get_table(val):
	return "waiter" if val else "customer"


@bp.route("/login", methods=["POST"])
def login():
	if "username" in session:
		return jsonify(error={"valid_credentials" : False, "message" : "Already in session, user must logout"})
	
	# Get the email and password from a post request as a json
	email = request.json.get('email')
	password = request.json.get('password')
	staff_login = request.json.get('staff_login')

	# select the user with the email inputted
	if staff_login:
		query = "SELECT email, password FROM waiter WHERE email = %s AND password = %s"
	else:
		query = "SELECT email, password FROM customer WHERE email = %s AND password = %s"
		
	cur.execute(query, (email, password))
	result = cur.fetchall()

	# if the result retruns nothing return invalid response
	if(not result):
		return jsonify(error={"valid_credentials" : False, "message" : "invalid email or password"})
	else:
		email = result[0][0]
		session["username"] = email
		return jsonify(data = {"valid_credentials" : True, "username" : email})


###  Temporary tests to run to test the file

#  curl -d '{"email":"example@example.com", "password":"password", "staff_login":false}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/login"
#  this is should result in the name john and valid_credentials being true

#  curl -d '{"email":"example@example.com", "password":"password", "staff_login":true}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/login"
#  this should result in an invalid input as it was looking at the wrong db table

#  curl -d '{"email":"waiter@waiter.com", "password":"supersecurepassword", "staff_login":true}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/login"
#  this should result in the name molly and valid credentails being true

#  curl -d '{"email":"waiter@waiter.com", "password":"supersecurepassword", "staff_login":false}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/login"
#  this should result in an invalid input as it was looking at the wrong db table
