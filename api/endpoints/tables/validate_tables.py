from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector

def validate_table(request):
    if "table_id" not in request.json:
        error_msg = "Expected 'table_id' and was not found"
        return jsonify(error = {"success":False, "message": error_msg})

    table_id = request.json.get("table_id")
    query = "SELECT table_number FROM table_details WHERE table_number = %s"
    result = connector.execute_query(query, (table_id,))
    if len(result) == 0:
        error_msg = "Table number does not exist in the database"
        return jsonify(error = {"success":False, "message": error_msg})

    return None
