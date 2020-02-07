from flask import Flask
from flask_cors import CORS
from endpoints import menu, login, sign_up, orders

app = Flask(__name__)
CORS(app)
app.register_blueprint(menu.bp)
app.register_blueprint(login.bp)
app.register_blueprint(sign_up.bp)
app.register_blueprint(orders.bp)

@app.route("/")
def root():
	return "For api go to api/<request>"

if __name__ == "__main__":
	app.debug = True
	app.run(port=5000)
