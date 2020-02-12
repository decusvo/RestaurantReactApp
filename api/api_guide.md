# GUIDE TO USING THE API

## Starting the api

- In order to start the api, you"ll first need all the related python packages.

- start a python virtual environment with "python3 -m venv venv" (from terminal)

- then start working in the environment with "source <your_venv_file>/bin/activate

- now install the requirements with "pip3 install -r requirements.txt"

- run main.py to start the server, it should be running on localhost:5000

## Outline of usage
- ALMOST every endpoint in the api is expecting a JSON object along with the request
- ALMOST every endpoint will return a JSON object describing the result, or the requested data.
- ALMOST every endpoint will return an error object of the following form if it fails:
	{
		error : {
			"success" : boolean,
			"message" : string
		}
	} 
- This object describes the nature of the error (a call could succeed but still give a warning), and a brief description.

## API endpoints:

### menu:
+EXPECTS: Currently doesn"t interact with any data sent with the request. Will eventually send items
	based on json.
+RETURNS: JSON object containing list of item ids in the form:
	{
		"data" : {
			items : [ints]
		}
	}

	OR an error object, error object will contain a list valid_events if a bad event argument is given.

### create_order:
EXPECTS: JSON object containing a table number and a list of item ids in the form:
	{
		"table_num" : int,
		"items" : [
			<menu_item_ids> int
		]
	}
RETURNS: JSON object 
	{
  		"data": {
    		"items_added": [
      			int
   			], 
    		"order_id": int, 
    		"success": boolean
  		}
	}
 
	OR an error object, will generate an error if one of the item ids given was invalid

### order_event:
EXPECTS: JSON object containing an order id and an event in the form:
	{
		"order_id" : int,
		"order_event" : String
	}

RETURNS: JSON object containing whether or not event was successfuly performed:
	{
		"data" : {
			"success" : boolean
		}
	}

	OR an error object

### login
EXPECTS: JSON object containg username:password pair, and whether or not it is a staff account password 
should be a valid sha256 hash:
	{
		"email" : string,
		"password" : string (sha256 hash),
		"staff_login" : boolean
	}

RETURNS: JSON object containing username of the account that was logged in and a boolean for success 
	{
		"data" : {
			"username" : string,
			"valid_credentials" : boolean
		}
	}

	OR an error object

### logout
EXPECTS: Does not expect any data, but will only execute if their is an active session

RETURNS: JSON object describing success and a message:
	{
		data : {
			"success" : boolean,
			"message" : string
		}
	}
	
