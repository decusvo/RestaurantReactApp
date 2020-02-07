from flask import Flask, session, request, Blueprint, jsonify

bp = Blueprint("session blueprint", __name__)

@bp.route("/make_session", methods=["POST", "GET"])
def make_session():
	session["username"] = request.json.get("username")
	print(session)
	print(session["username"])
	return jsonify(session_id = session["username"])

#  curl -d '{"username":"waiter@waiter.com"}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/make_session"

@bp.route("/get_session_id", methods=["POST", "GET"])
def get_session_username():
	return(session["username"])

@bp.route("/remove_session", methods=["POST", "GET"])
def remove_session():
	username_to_rm = request.args.get("username")
	session.pop("username", None)
	return "Successfully removed: " + username_to_rm

