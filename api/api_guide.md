# GUIDE TO USING THE API

## Starting the api

- In order to start the api, you'll first need all the related python packages.

- start a python virtual environment with  python3 -m venv venv  (from terminal)

- then start working in the environment with  source <your_venv_file>/bin/activate

- now install the requirements with  pip3 install -r requirements.txt

- run main.py to start the server, it should be running on localhost:5000

## Outline of usage
- ALMOST every endpoint in the api is expecting a JSON object along with the request
- ALMOST every endpoint will return a JSON object describing the result, or the requested data.
- ALMOST every endpoint will return an error object of the following form if it fails:

  ```json
  {
	"error": {
	  "success" : false,
	  "message" : "A description of the error"
	}
  }
  ```
- This object describes the nature of the error (a call could succeed but still give a warning), and a brief description.

## API endpoints:

### /menu:
+EXPECTS: JSON object containing true or false value for getAll, which determines
if it returns all available items or not respectively. If getAll is not specified it returns only
available menu items

  ```json
  {
  "getAll" : true
  }
  ```

+RETURNS: JSON object containing list of item ids in the form:

  ```json
  {
	"data" : {
	  "items": [
        {
          "available": true,
          "calories": 600,
          "description": "Crips mexican doughnuts with rich chocolate sauce",
          "gluten_free": false,
          "id": 16,
          "image": " http://personal.rhul.ac.uk/zfac/242/Team16/Churros.jpg",
          "name": "Churros",
          "price": "$5.25",
          "type": "dessert",
          "vegan": false,
          "vegetarian": true
        },
        {"..."}
      ]
	   }
  }
  ```
	or an error object, error object will contain a list valid_events if a bad event argument is given.

### /create\_order:
EXPECTS: JSON object containing a table number and a list of item ids in the form:

  ```json
  {
	"table_num" : 1,
	"items" : [1, 2, 3]
  }
  ```

RETURNS: JSON object

  ```json
  {
    "data": {
      "items_added": [1, 2, 3],
      "order_id" : 1,
      "success" : true
    }
  }
   ```

	or an error object, will generate an error if one of the item ids given was invalid

### /order\_event:
EXPECTS: JSON object containing an order id and an event in the form, the given event will
be added to the database if it passes the event validation:

  ```json
  {
	"order_id" : 1,
	"order_event" : "request"
  }
  ```

RETURNS: JSON object containing whether or not event was successfully performed:

  ```json
  {
	"data" : {
	  "success" : true
	}
  }
  ```

	or an error object

### /get\_orders:
EXPECTS: JSON object containing the list of states you'd like to get orders for. If you want to
retrieve all orders, then pass an empty array:

  ```json
  {
  "states": ["start", "cooking", "requested"]
  }
  ```

RETURNS: JSON object containing the data requested, if no data exists an empty array will be returned
It also returns the ordered items in a json object containing the quantity ordered and
the price of each item times the quantity

  ```json
  {
  "data": {
    "orders": [
      {
        "id": 1,
        "items": [
          {
            "cumulative_price": "$10.50",
            "name": "Veggie nachos",
            "quantity": 2
          }
        ],
        "ordered_time": "20:46:54",
        "price": "$10.50",
        "state": "start",
        "table_number": 1
        }
      ]
    }
  }
  ```

	or an error object

### /login
EXPECTS: JSON object containing username:password pair, and whether or not it is a staff account password
should be a valid sha256 hash:

  ```json
  	{
	  "email" : "example@example.com",
  	  "password" : "sha256hash",
	  "staff_login" : true
  	}
  ```

RETURNS: JSON object containing username of the account that was logged in and a boolean for success

  ```json
  {
	"data" : {
	  "username" : "example_username",
	  "valid_credentials" : true
	}
  }
  ```

	or an error object

### /logout
EXPECTS: Does not expect any data, but will only execute if their is an active session

RETURNS: JSON object describing success and a message:

  ```json
  {
	"data": {
	  "success" : true,
	  "message" : "Message describing what happened"
	}
  }
  ```

### /signup
EXPECTS: JSON object containing the email, password, firstname and lastname

RETURNS: JSON object describing success

  ```json
  {
    "data": {
      "success": true
    }
  }

  ```

	or an error object

## Sessions:

### /

## Sessions:

### /create\_session
EXPECTS: JSON object containing the email and staff:

  ```json
  	{
	  "email" : "example@example.com",
	  "staff : false
  	}
  ```

RETURNS: JSON object describing success

  ```json
  {
    "data": {
      "session_id": "example@example.com",
	  "staff":  false
    }
  }

  ```

	or an error object

### /get\_session\_id
EXPECTS: Does not expect any data but will return error if no session is active

RETURNS: JSON
  ```json
  	{
	  "data" : {
	    "session_id" : "example@example.com"
  	  }
	}
  ```

	or an error object

### /get\_session\_is\_staff
EXPECTS: Does not expect any data but will return error if no session is active

RETURNS: JSON
  ```json
  	{
	  "data" : {
	    "staff" : true
  	  }
	}
  ```

	or an error object

### /remove\_session
EXPECTS: Does not expect any data but will return error if no session is active

RETURNS: JSON
  ```json
  	{
	  "data" : {
	    "removed_session_id" : "example@example.com",
		"success" : true
  	  }
	}
  ```

	or an error object

### /order\_event
EXPECTS: Expects the order event, and the order you'd like to have it occur on:
  ```json
  	{
	  "order_id" : 1,
	  "order_event" : "requested"
  	}
  ```

RETURNS: JSON
  ```json
  	{
	  "data" : {
		"success" : true
  	  }
	}
  ```

	or an error object
