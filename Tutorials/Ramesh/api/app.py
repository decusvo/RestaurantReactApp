from flask import Flask, jsonify, request
app = Flask(__name__)

#the dictionaries will be a substitute for a database collection pull
Forenames = [{'name' : 'Jimmy'}, {'name' : 'Bob'}, {'name' : 'Kevin'}]

@app.route('/', methods=['GET'])
def test():
	return jsonify({'message' : 'It works!'})

@app.route('/Forename', methods =['GET'] )
def returnAll():
		return jsonify({'Forenames' : Forenames})
	
#This will return the dictionary with the matching name from the list above
@app.route('/Forename/<string:name>', methods=['GET'])
def returnSingle(name):
	#This will search the list for matching items and then return a list
	names = [Forename for Forename in Forenames if Forename['name'] == name]
	return jsonify({'Forename' : names[0]}) #This will return the first occurrence of a name

#I am using the chrome extension Postman as a simple way to send request and json objects

#This same endpoint will be used for getting, however it will have the function
#of inserting items
@app.route('/Forename', methods=['POST'])
def addSingle():
	Forename = {'name' : request.json['name']}
	
	Forename.append(language)
	return jsonify({'Forenames' : Forenames})

@app.route('/Forename/<string:name>', methods=['PUT'])
def editSingle(name):
		names = [Forename for Forename in Forenames if Forename['name'] == name]
		names[0]['name'] = request.json['name']
		return jsonify({'Forename' : names[0]})
#to edit an entry in this case you must go to the endpoint while passing it an argument
#an examaple in this case could be Kevin. You must then create a json object which will be used to update the list
#in this case you can use {"name" : "Dan"} this will cause 'Kevin' to be replaced when 'Dan'

@app.route('/Forename/<string:name>', methods=['DELETE'])
def removeSingle(name):
		names = [Forename for Forename in Forenames if Forename['name'] == name]
		Forenames.remove(names[0])
		return jsonify({'Forenames' : Forenames})
#In this case, sending the delete request for the name 'Kevin' would take the form of
# 127.0.0.1:5000/Forenames/Kevin which would remove the dictionary kevin from the list

if __name__ == 'main':
	app.run(debug=True,port=5000) #This is will run the app on port 5000 in debug mode
