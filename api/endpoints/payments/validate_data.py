from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector, validate_functions as vf
import datetime


def validate_payments(request):
    error = vf.sent_expected_values(["card_num", "cvv", "sort_num", "expiry_date"], request)
    if error:
        return error

    # checks if its of a valid length
    credit_card_num = request.json.get("card_num")
    if(len(credit_card_num) != 15 and len(credit_card_num) != 16):
        error_msg = "Card number not a valid size, expected size 15 or 16 got " + str(len(credit_card_num))
        return jsonify(error = {"success": False, "message":error_msg})
    
    #checks if card number if valid using Luhn's formula
    current_index = len(credit_card_num) - 1
    while (current_index > 0):
        index_doubled =int(credit_card_num[current_index]) * 2
        if (index_doubled > 10):
            #This is done to add the 2 integers together if index_doubled is greater than 10
            #because any number greater than 10 minus 9 is equal to the 2 digits added together
            #For example if index_doubled is 12. 12 - 9 is 3 which is the same as 1 + 2 when 12 is broken down
            index_double = index_doubled - 9
        total = total + index_doubled
        current_index = current_index - 2
    remainder = total % 10
    if(remainder !=0):
        error_msg ="Card number is not valid"
        return jsonify(error = {"success": False, "message":error_msg})

    cvv = request.json.get("cvv")

    if(len(cvv) != 3):
        error_msg = "CVV not a valid"
        return jsonify(error = {"success": False, "message":error_msg})

    sort_num = request.json.get("sort_num")

    if(len(sort_num) != 6):
        error_msg = "Sort number not a valid size"
        return jsonify(error = {"success": False, "message":error_msg})

    expiry_date = request.json.get("expiry_date")
    try:
        date = datetime.datetime.strptime(expiry_date, '%m%y')
    except ValueError:
        error_msg = "Date not in correct format should be month year with not separation '1020' is october 2020"
        return jsonify(error = {"success": False, "message": error_msg})

    if date < datetime.datetime.now():
        error_msg = "Not a valid date"
        return jsonify(error = {"success": False, "message":error_msg})
