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

@app.route("/menu")
def menu():
    if len(request.args) == 0:  # if there are no arguments select everything
        #  gets the whole menu from the database and gets the menu item type i.e. side, main ect
        #  this sql query returns the result as an already formatted json
        cur.execute("SELECT TO_JSON(t) " +
            "FROM (SELECT menu.id, name, description, vegan, " +
            "gluten_free, vegetarian, calories, price, available, type " +
                "FROM menu, item_type " +
                "WHERE item_type.id = menu.food_type)" +
            "t;")
        #  gets the result from the database
        result = cur.fetchall()
        return jsonify(result)
    else:  # not implemented yet
        # add the abilty to handle multiple arguments in the querys
        # for example get only sides ect by adding '?item_type=side'
        return jsonify(Error="arguments not implemented yet")

if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)
