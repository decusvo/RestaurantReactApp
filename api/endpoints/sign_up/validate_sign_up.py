from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector

def validate_user(request):
    if "email" not in request.json:
        error_msg = "Expected 'email' and was not found"
        return jsonify(error = {"success":False, "message": error_msg})

    if "firstname" not in request.json:
        error_msg = "Expected 'firstname' and was not found"
        return jsonify(error = {"success":False, "message": error_msg})

    if "lastname" not in request.json:
        error_msg = "Expected 'lastname' and was not found"
        return jsonify(error = {"success":False, "message": error_msg})

    if "password" not in request.json:
        error_msg = "Expected 'password' and was not found"
        return jsonify(error = {"success":False, "message": error_msg})

    return None

def validate_customer(request):
    error = validate_user(request)
    if error:
        return error

    email = request.json.get('email')

    query = "SELECT email FROM customer WHERE email = %s;"
    result = connector.execute_query(query, (email,))
    # if there is someone in the database with that email already
    if len(result) == 1:
        error_msg = "Email given is already in use"
        return jsonify(error = {"success":False, "message": error_msg})

    return None

def validate_waiter(request):
    error = validate_user(request)
    if error:
        return error

    if "phone_number" not in request.json:
        error_msg = "Expected 'phone_number' and was not found"
        return jsonify(error = {"success":False, "message": error_msg})

    phone_number = request.json.get('phone_number')
    # if the phone number is not an integer and of length 11
    if len(phone_number) != 11 and type(phone_number) != type(1):
        error_msg = "Phone number was not a valid input must be 07 followed by 9 digits"
        return jsonify(error = {"success":False, "message": error_msg})

    email = request.json.get('email')

    query = "SELECT email FROM waiter WHERE email = %s;"
    result = connector.execute_query(query, (email,))
    # if there is someone in the database with that email already
    if len(result) == 1:
        error_msg = "Email given is already in use"
        return jsonify(error = {"success":False, "message": error_msg})

    return None
