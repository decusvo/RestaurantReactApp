from flask import Flask
from endpoints import menu, login, sign_up, orders

app = Flask(__name__)
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
