from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


class Ex1(Resource):
    def get(self):
        #defualt to 200 = ok
        return {'task': 'Hello world'}

class Ex2(Resource):
    def get(self):
        # set response code to 201 i.e. to signify the success of other events
        return {'task':'Hello world'}, 201

class Ex3(Resource):
    def get(self):
        # Set the response code to 201 and return some cusomter headers
        return {'task': 'Hello world'}, 201, {'Etag': 'something'}

api.add_resource(Ex1, '/Ex1')
api.add_resource(Ex2, '/Ex2')
api.add_resource(Ex3, '/Ex3')

if __name__ == '__main__':
    app.run(debug=True)
