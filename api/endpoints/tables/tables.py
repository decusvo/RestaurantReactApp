from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector


bp = Blueprint("tables blueprint", __name__)

@bp.route("/get_tables", methods=["POST"])
def get_tables():
    return jsonify({"success": True})
