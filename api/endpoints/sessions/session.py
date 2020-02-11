from flask import Flask, session, request, Blueprint, jsonify, Response

bp = Blueprint("session blueprint", __name__)

@bp.route("/create_session", methods=["POST", "GET"])
def create_session(username=None):
	if "username" in session:
		print("SESSION ALREADY HAS USERNAME ATTRIBUTE")
		return jsonify(error={"message": "SESSION ALREADY HAS ID/USERNAME"})

	if not username:
		username = request.json.get("username")
	
	session["username"] = username
	return jsonify(session_id = session["username"])

#  curl -d '{"username":"waiter@waiter.com"}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/make_session"

@bp.route("/get_session_id", methods=["POST", "GET"])
def get_session_id():
	try:
		return jsonify(session_id = session["username"])
	except:
		return jsonify(error={"message": "SESSION DOES NOT HAVE ID/USERNAME"})

@bp.route("/remove_session", methods=["POST", "GET"])
def remove_session():
	if "username" in session:
		session["username"]
		username_to_rm = session.pop("username", None)
		return jsonify(removed_session_id = username_to_rm, success = True)
	else:
		return jsonify(error={"message": "SESSION WITH GIVEN ID DOES NOT EXIST"})

