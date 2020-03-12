from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector


bp = Blueprint("tables blueprint", __name__)

@bp.route("/get_tables", methods=["POST"])
def get_tables():
    query = "select table_number as table_numbers from table_details"
    result = connector.execute_query(query)
    output = []
    for ele in result:
        output.append(ele[0])
    return jsonify(data={"tables":output})
