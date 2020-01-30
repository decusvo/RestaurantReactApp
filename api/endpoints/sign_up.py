from flask import Flask, request, jsonify
import psycopg2

###
###  makes connection to a psql database
###  this is temporary!!
###
connection = psycopg2.connect(user = "jrngriijazlzxr",
                                  password = "655c5947f8ad0f453bfd4b5d4b80d6374a3a97f706c4533a60be75c3de343817",
                                  host = "ec2-54-247-72-30.eu-west-1.compute.amazonaws.com",
                                  port = "5432",
                                  database = "d9vtdql067f73n")
cur = connection.cursor()

app = Flask(__name__)

@app.route("/sign_up", methods=["POST"])
def sign_up():
    #  Get the details of the user from a post request as a json
    email = request.json.get('email')
    password = request.json.get('password')
    firstname = request.json.get('firstname')
    lastname = request.json.get('lastname')

    try:
        cur.execute("INSERT INTO customer VALUES ('{}','{}','{}','{}')".format(email, firstname, lastname, password))
    except psycopg2.errors.UniqueViolation:
        return jsonify(success = False)

    connection.commit()

    return jsonify(success = True)


if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)


#  Temporary test commands

#  curl -d '{"email":"testing@test.com", "password":"password", "firstname":"DELETE", "lastname":"ME"}' -H "Content-type: application/json"  -X POST "127.0.0.1:5000/sign_up"
#  this should return a json saying if it was successful or not
