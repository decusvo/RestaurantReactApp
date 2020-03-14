from flask import Flask, session, request, Blueprint, jsonify, Response

bp = Blueprint("session blueprint", __name__)


@bp.route("/create_session", methods=["POST", "GET"])
def create_session(username=None, staff=False):
	if "username" in session:
		return jsonify(error={"message": "SESSION ALREADY HAS ID/USERNAME"})

	if not username:
		username = request.json.get("username")
	
	session["username"] = username
	session["staff"] = staff
	global s
	s = session.copy()
	return jsonify(data={"session_id" : session["username"], "staff" : session["staff"]})

#  curl -d '{"username":"waiter@waiter.com"}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/make_session"

@bp.route("/get_session_id", methods=["POST", "GET"])
def get_session_id():
	try:
		session = s
		return jsonify(data={"session_id" : session["username"], "staff": session["staff"]})
	except:
		return jsonify(error={"message": "SESSION DOES NOT HAVE ID/USERNAME", "success" : False})

@bp.route("/get_session_is_staff", methods=["POST"])
def get_session_is_staff():
	try:
		return jsonify(data={"staff" : session["staff"]})
	except:
		return jsonify(error={"massage" : "NO ACTIVE SESSION", "success" : False})

@bp.route("/remove_session", methods=["POST", "GET"])
def remove_session():
	session = s
	if "username" in session:
		username_to_rm = session.pop("username", None)
		session.pop("staff", None)
		return jsonify(data={"removed_session_id" : username_to_rm, "success" : True})
	else:
		return jsonify(error={"message": "SESSION WITH GIVEN ID DOES NOT EXIST"})

