from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector
import datetime


def validate_payments(request):
    if "card_num" not in request.json:
        error_msg = "Expected 'card_num' but was not found"
        return jsonify({"success": False, "message": error_msg})

    if "cvv" not in request.json:
        error_msg = "Expected 'cvv' but was not found"
        return jsonify({"success": False, "message":error_msg})

    if "sort_num" not in request.json:
        error_msg = "Expected 'sort_num' but was not found"
        return jsonify({"success": False, "message": error_msg})

    if "expiry_date" not in request.json:
        error_msg = "Expected 'expiry_date' but was not found"
        return jsonify({"success": False, "message":error_msg})

    # checks if its of a valid length
    credit_card_num = request.json.get("card_num")
    if(len(credit_card_num) != 15 and len(credit_card_num) != 16):
        error_msg = "Card number not a valid size, expected size 15 or 16 got " + str(len(credit_card_num))
        return jsonify({"success": False, "message":error_msg})

#############################################################################################
#--------------- NEED TO IMPLEMENT CHECKSUM TEST OF CREDIT CARD NUMBER ---------------------#
#############################################################################################


    cvv = request.json.get("cvv")

    if(len(cvv) != 3):
        error_msg = "CVV not a valid"
        return jsonify({"success": False, "message":error_msg})

    sort_num = request.json.get("sort_num")

    if(len(sort_num) != 6):
        error_msg = "Sort number not a valid size"
        return jsonify({"success": False, "message":error_msg})

    expiry_date = request.json.get("expiry_date")
    date = datetime.datetime.strptime(expiry_date, '%m%y')
    if(date < datetime.datetime.now()):
        error_msg = "Not a valid date"
        return jsonify({"success": False, "message":error_msg})
