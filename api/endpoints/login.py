from flask import Flask, request, jsonify
import psycopg2


app = Flask(__name__)

@app.route("/login", methods=["POST"])
def login():
    #  Get the email and password from a post request as a json
    email = request.json.get('email')
    password= request.json.get('password')

    return jsonify(email = email, password = password)

if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)
