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
    # Get the email and password from a post request as a json
    email = request.json.get('email')
    password = request.json.get('password')
    staff_login = request.json.get('staff_login')

    which_table = get_table(bool(staff_login))

    # select the user with the email inputted
    cur.execute("SELECT email FROM {} WHERE email = '{}'".format(which_table, email))
    result = cur.fetchall()

    # if the result retruns nothing return invalid response
    if(not result):
        return jsonify(valid_credentials=False)

    # get the password of the user
    cur.execute("SELECT password, firstname " +
      "FROM {} ".format(which_table) +
      "WHERE email = '{}'".format(email))
    result = cur.fetchall()

    # checks if the password returned is the same as the one inputted
    if result[0][0] != password:
        return jsonify(valid_credentials=False)

    return jsonify(name = result[0][1], valid_credentials = True)


###  Temporary tests to run to test the file

#  curl -d '{"email":"example@example.com", "password":"password", "staff_login":false}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/login"
#  this is should result in the name john and valid_credentials being true

#  curl -d '{"email":"example@example.com", "password":"password", "staff_login":true}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/login"
#  this should result in an invalid input as it was looking at the wrong db table

#  curl -d '{"email":"waiter@waiter.com", "password":"supersecurepassword", "staff_login":true}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/login"
#  this should result in the name molly and valid credentails being true

#  curl -d '{"email":"waiter@waiter.com", "password":"supersecurepassword", "staff_login":false}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/login"
#  this should result in an invalid input as it was looking at the wrong db table
