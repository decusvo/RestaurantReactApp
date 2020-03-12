from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector


bp = Blueprint("payments blueprint", __name__)

@bp.route("/verify_payment", methods=["POST"])
def get_tables():
    return jsonify(data={"success":True})
