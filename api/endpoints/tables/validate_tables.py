from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector

def validate_table(request):
    if "table_id" not in request.json:
        error_msg = "Expected 'table_id' and was not found"
        return jsonify(error = {"success":False, "message": error_msg})

    table_id = request.json.get("table_id")
    if table_id is None:
        error_msg = "Nothing was given as the value of table_id"
        return jsonify(error = {"success":False, "message": error_msg})

    query = "SELECT table_number FROM table_details WHERE table_number = %s"
    result = connector.execute_query(query, (table_id,))
    if len(result) == 0:
        error_msg = "Table number does not exist in the database"
        return jsonify(error = {"success":False, "message": error_msg})

    return None

def validate_event(request):
    error = validate_table(request)
    if error:
        return error

    if "waiter_id" not in request.json:
        error_msg = "Expected 'waiter_id' argument, none was given"
        return jsonify(error={"success" : False, "message" : error_msg})

    waiter = request.json.get("waiter_id")

    if waiter is not None:
        result = connector.execute_query("SELECT * FROM waiter WHERE email=%s", (waiter,))
        if len(result) == 0:
            error_msg = "Given waiter email does not appear in waiter table"
            return jsonify(error={"success" : False, "message" : error_msg})

    return None
