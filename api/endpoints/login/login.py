from flask import Flask, request, jsonify, Blueprint, session
from endpoints import sessions
import psycopg2
from common import connector


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
		
	result = connector.execute_query(query, (email, password))

	# if the result retruns nothing return invalid response
	if(not result):
		return jsonify(error={"valid_credentials" : False, "message" : "invalid email or password"})
	else:
		email = result[0][0]
		sessions.session.create_session(email)
		return jsonify(data = {"valid_credentials" : True, "username" : email})

@bp.route("/logout", methods=["POST"])
def logout():
	if "username" not in session:
		return jsonify(error={"success" : False, "message" : "No active session"})
	sessions.session.remove_session()
	return jsonify(data={"success" : True, "message" : "session ended"})

