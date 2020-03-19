from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector


bp = Blueprint("tables blueprint", __name__)

@bp.route("/get_tables", methods=["POST"])
def get_tables():
    query = "SELECT table_number AS table_numbers FROM table_details"
    result = connector.execute_query(query)
    output = []
    for ele in result:
        output.append(ele[0])
    return jsonify(data={"tables":output})

@bp.route("/get_tables_and_waiters", methods=["POST"])
def get_tables_and_waiters():
    query = "SELECT table_number, email, firstname, lastname "\
            "FROM table_details, waiter "\
            "WHERE waiter.email = waiter_id "
    result = connector.json_select(query)

    return jsonify(data={"tables":result})
