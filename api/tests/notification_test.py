import requests, json, sys
try:
	from . import tester
except:
	import tester

session = requests.Session()

verbose = False

api_url = "http://localhost:5000/"

def test_add_waiter_notification():
	notification_json = {"waiter_id" : 1, 
						"customer_id" : "example@example.com", 
						"message" : "notification message"}

	req = session.post(api_url + "add_waiter_notification", json=notification_json)
	if verbose:
		print(req.text)
	return req.status_code

def test_add_customer_notification():
	notification_json = {"waiter_id" : 1, 
						"customer_id" : "example@example.com", 
						"message" : "notification message for customer"}

	req = session.post(api_url + "add_customer_notification", json=notification_json)
	if verbose:
		print(req.text)
	return req.status_code

def test_get_waiter_notifications():
	req = session.post(api_url + "get_waiter_notifications", json={"waiter_id" : 1})
	if verbose:
		print(req.text)
	return req.status_code
	
def test_get_customer_notifications():
	req = session.post(api_url + "get_customer_notifications", json={"customer" : "example@example.com"})
	if verbose:
		print(req.text)
	return req.status_code

tests = [
		test_add_waiter_notification,
		test_add_customer_notification,
		test_get_waiter_notifications,
		test_get_customer_notifications,
		]

if __name__ == "__main__":
	if len(sys.argv) > 1 and sys.argv[1] == "v":
			verbose = True
	tester.run_tests(tests)








