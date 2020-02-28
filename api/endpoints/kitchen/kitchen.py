from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector
#To be used for later functionality
#from flask_notifications import Notifications
#from pywebpush import webpush, WebPushException

bp = Blueprint("kitchen blueprint", __name__)

@bp.route("/update_order_state",methods=["POST"])
def change_cooking_state():
    #default state of all orders is start
    #kitchen will only be able to change state to 'cooking' and 'ready_to_deliver'
    newState = request.json.get("newState")
    orderId = request.json.get("Id")
    #Prevent kitchen staff from setting orders into states that they have no control over
    if newState != "cooking" or newState != "ready_to_deliver":
        return jsonify(error={"success":False, "message":"Please enter a valid order state"})
    else:
        query = "UPDATE orders SET state = %s WHERE id = %s"
        result=connector.execute_insert_query(query,(newState,Id))
        if result == False:
            return jsonify(error={"success":False, "message":"Error order does not exist"})
        return jsonify(data={"success":True})
    
#will need to create private and public keys in order to push notifications
#@bp.route("/send_waiter_notifaction", methods=["POST"])
#def push_notification():
#    webpush(
#        subscription_info=subscription_info,
#        data="Test 123", # could be json object as well
#        vapid_private_key= "  " ,
#        vapid_claims={"sub": "  " email to be used for contact}
#    )