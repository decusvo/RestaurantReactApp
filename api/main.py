from flask import Flask

app = Flask(__name__)

@app.route("/")
def root():
	return "For api go to api/<request>"

if __name__ == "__main__":
	app.debug = True
	app.run(port=5000)
