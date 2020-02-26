import requests, json, sys
try:
	from . import tester
except:
	import tester

session = requests.Session()

verbose = False

api_url = "http://localhost:5000/"

def test_order_event_request():
	req = session.post(api_url + "order_event", json={"order_id" : 1, "order_event" : "request"})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_no_order_event():
	req = session.post(api_url + "order_event", json={"order_id" : "1"})
	if verbose:
		print(req.text)
	return req.status_code

tests = [
	test_order_event_request,
	test_order_event_request,
]

if __name__ == "__main__":
	if len(sys.argv) > 1 and sys.argv[1] == "v":
		verbose = True
	tester.run_tests(tests)
