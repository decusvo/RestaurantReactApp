from flask import Flask, session, request, Blueprint

bp = Blueprint("session blueprint", __name__)

@bp.route("/make_session", methods=["POST", "GET"])
def make_session():
	session["username"] = request.args.get("username")
	return session["username"]

@bp.route("/get_session_username", methods=["POST", "GET"])
def get_session_username():
	return(session["username"])

@bp.route("/remove_session", methods=["POST", "GET"])
def remove_session():
	username_to_rm = request.args.get("username")
	session.pop("username", None)
	return "Successfully removed: " + username_to_rm

