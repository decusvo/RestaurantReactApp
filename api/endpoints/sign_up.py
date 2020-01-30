from flask import Flask, request, jsonify
import psycopg2


app = Flask(__name__)

@app.route("/sign_up", methods=["POST"])
def sign_up():
    #  Get the details of the user from a post request as a json
    email = request.json.get('email')
    password = request.json.get('password')
    firstname = request.json.get('firstname')
    lastname = request.json.get('lastname')

    #  returns the data recived through the post 
    return jsonify(firstname = firstname, lastname = lastname, email = email, password = password)


if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)


#  Temporary test commands

#  curl -d '{"email":"testing@test.com", "password":"password", "firstname":"DELETE", "lastname":"ME"}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/sign_up"
#  this should just print all the details inputted
