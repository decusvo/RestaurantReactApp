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

tests = [
		test_add_waiter_notification,
		]

if __name__ == "__main__":
	if len(sys.argv) > 1 and sys.argv[1] == "v":
			verbose = True
	tester.run_tests(tests)








