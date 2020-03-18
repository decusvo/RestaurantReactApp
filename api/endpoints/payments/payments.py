from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector
from . import validate_data


bp = Blueprint("payments blueprint", __name__)

@bp.route("/verify_payment", methods=["POST"])
def get_tables():
    error = validate_data.validate_payments(request)
    if error:
        return (error)

    return jsonify(data={"success":True})
