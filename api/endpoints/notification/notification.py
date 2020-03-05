import json
from flask import Flask
import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from pywebpush import webpush, WebPushException
from common import connector

#creates a an object with publicKey and privateKey values
#vapidKeys = webpush.generateVAPIDKeys()

# Prints 2 URL Safe Base64 Encoded Strings
# print(vapidKeys.publicKey, vapidKeys.privateKey)

WEBPUSH_VAPID_PRIVATE_KEY = 'placeholder'

#point to accept subscription
@bp.route('/subscribe', methods=["POST"])
def subscribe():
    subscription_info = request.json.get('subscription_info')
    # if is_active=False == unsubscribe
    #default value for is_active is True
    is_active = request.json.get('is_active')
    #assume subscription_info shall be the same
    item = Subscriber.query.filter(Subscriber.subscription_info == subscription_info).first()
    if not item:
        item = Subscriber()
        item.created = datetime.datetime.now()
        item.subscription_info = subscription_info

    item.is_active = is_active
    item.modified = datetime.datetime.now()
    db.session.add(item)
    db.session.commit()

    return jsonify({ id: item.id })

#send notification to all subscribers 
@app.route('/notify', methods=["POST"])
def notify():

    items = Subscriber.query.filter(Subscriber.is_active == True).all()
    #number of notifications sent
    count = 0
    for _item in items:
        try:
            webpush(
                subscription_info=_item.subscription_info_json,
                data="Test 123", # will be json object on completion
                vapid_private_key=WEBPUSH_VAPID_PRIVATE_KEY,
                vapid_claims={
                    "sub": "placeholder@live.rhul.ac.uk"
                }
            )
            count += 1
        except WebPushException as ex:
            return jsonify(error={"success":False, "message":"Error webpush fail"})

    return jsonify(data={"success":True})
