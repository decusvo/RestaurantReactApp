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

@app.route("/login", methods=["POST"])
def login():
    #  Get the email and password from a post request as a json
    email = request.json.get('email')
    password= request.json.get('password')

    #  select the user with the email inputted
    cur.execute("SELECT email FROM customer WHERE email = '%s'" %email)
    result = cur.fetchall()

    #  if the result retruns nothing return invalid response
    if(not result):
        return jsonify(valid_credentials=False)

    return jsonify(result)


if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)
