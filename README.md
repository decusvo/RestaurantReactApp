# Team Project (CS2810) Group 16
### Running the Project as a Whole
* To run the whole project, follow guides for the API, Kitchen and Customer/Waiter and
run each in their own terminal. 

### RESTful Flask API:
* The API can be found in api/
* The guide/documentation for the api can be found at [api/api_guide.md](/api/api_guide.md) 
* To populate a database, modify api/common/connector.py to target your database
    * Then run populate_db.py "python3 populate_db.py"
    * if you get filenotfound errors it's likely because the relative location
	to the .csv data files is wrong from where you're executing.

### Customer/Waiter UI:
* The main application that is used by both customers and waiters can be found in ui/
* The guide to start the application can also be found in [ui/ui_guide.md](/ui/ui_guide.md)

### Kitchen Staff App:
* This is the Kitchen staff application, it is completely separate to the customer and waiter
app however uses the same api.
* The guide to start the application can also be found in [kitchen/kitchen_guide.md](/Kitchen/kitchen_guide.md)