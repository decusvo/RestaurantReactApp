from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)  # creates an instance of flask
api = Api(app)

class HelloWorld(Resource):  # class returns hello world from a get request
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')  # assigns the url '/' to call the class HelloWorld

if __name__ == '__main__':
    app.run(debug=True)  # runs the server in dubugger mode


#  to run code run 'python helloworld.py'
#  then to test it works either copy '127.0.0.1:5000/' into browser
#  or run 'curl 127.0.0.1:5000/'
