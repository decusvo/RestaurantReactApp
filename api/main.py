from flask import Flask, session
from flask_cors import CORS
from endpoints import menu_bp, login_bp, sign_up_bp, orders_bp, sessions_bp
from datetime import timedelta


app = Flask(__name__)
app.secret_key = "secret"
CORS(app)

app.register_blueprint(menu_bp)
app.register_blueprint(login_bp)
app.register_blueprint(sign_up_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(sessions_bp)

@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=5)

@app.route("/")
def root():
	return "For api go to api/<request>"

if __name__ == "__main__":
	app.debug = True
	app.run(port=5000)
