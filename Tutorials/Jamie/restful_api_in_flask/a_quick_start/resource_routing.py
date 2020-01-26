from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

todos = {}  #stores the data for the todo set

class TodoSimple(Resource):
    def get(self, todo_id):
        return {todo_id: todos[todo_id]}  # returns the data about the todo id parsed to it

    def put(self, todo_id):
        todos[todo_id] = request.form['data']  # requests the data from the user and adds it to the set
        return {todo_id: todos[todo_id]}  # returns the data inputed

# adds the class TodoSimple to be called at the url '/'
#  it also takes an input string which is assigned to the variable todo_id
api.add_resource(TodoSimple, '/<string:todo_id>')

if __name__ == '__main__':
    app.run(debug=True)


#  to run code run 'python resource_routing.py'
#  then to test it use ' curl http://127.0.0.1:5000/todo1 -d "data=Remeber the milk" -X PUT'
#  then then to test if it has been added 'curl http://127.0.0.1:5000/todo1'
