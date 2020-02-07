from flask import Flask
from flask_cors import CORS
from endpoints import menu_bp, login_bp, sign_up_bp, orders_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(menu_bp)
app.register_blueprint(login_bp)
app.register_blueprint(sign_up_bp)
app.register_blueprint(orders_bp)

@app.route("/")
def root():
	return "For api go to api/<request>"

if __name__ == "__main__":
	app.debug = True
	app.run(port=5000)
