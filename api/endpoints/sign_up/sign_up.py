from flask import Flask, request, jsonify, Blueprint
import psycopg2
from common import connector
from . import validate_sign_up

bp = Blueprint("signup blueprint", __name__)

@bp.route("/signup", methods=["POST"])
def sign_up():
    error = validate_sign_up.validate_user(request)
    if error:
        return error

    #  Get the details of the user from a post request as a json
    email = request.json.get('email')
    password = request.json.get('password')
    firstname = request.json.get('firstname')
    lastname = request.json.get('lastname')

    query = "INSERT INTO customer VALUES (%s, %s, %s, %s);"
    result = connector.execute_insert_query(query, (email, firstname, lastname, password))
    # if the sql INSERT doesn't work it reverts the statement to prevent data corruption
    if result is False:
        return jsonify(error = {"success": False, "message": "Query failed invalid input"})

    return jsonify(data = {"success": True})


#  Temporary test commands

#  curl -d '{"email":"testing@test.com", "password":"password", "firstname":"DELETE", "lastname":"ME"}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/sign_up"
#  this should return a json saying if it was successful or not
