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
+EXPECTS: Currently doesn't interact with any data sent with the request. Will eventually send items
	based on json.

+RETURNS: JSON object containing list of item ids in the form:

  ```json
  {
	"data" : {
	  "items": [1, 2, 3]
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
EXPECTS: JSON object containing an order id and an event in the form:

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
EXPECTS: JSON object containing either one of the possible states and object can be in or 'all'
which will return all orders no matter the state:

```json
{
"state": "cooking"  
}
```

RETURNS: JSON object containing the data requested, if no data exists an empty array will be returned

```json
{
  "data" : [
    {
      "id": 1,
      "start": "start",
      "table_number": 1
    },
    {
      "id": 2,
      "state": "requested",
      "table_number": 2
    }
  ]
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
