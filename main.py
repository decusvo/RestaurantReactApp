from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
	return "hello"

if __name == "__main__":
	app.debug = True
	app.run(port=5000)
