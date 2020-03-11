import requests, json, sys
try:
	from . import tester
except:
	import tester

session = requests.Session()

verbose = False

api_url = "http://localhost:5000/"

def test_order_event_no_id():
	req = session.post(api_url + "order_event", json={"order_event" : "request"})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_no_event():
	req = session.post(api_url + "order_event", json={"order_id" : 1})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_invalid_id():
	req = session.post(api_url + "order_event", json={"order_id" : -1, "order_event" : "request"})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_invalid_event():
	req = session.post(api_url + "order_event", json={"order_id" : 1, "order_event" : "not an event"})
	if verbose:
		print(req.text)
	return req.status_code


def test_order_event_request():
	req = session.post(api_url + "order_event", json={"order_id" : 1, "order_event" : "request"})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_confirm():
	req = session.post(api_url + "order_event", json={"order_id" : 1, "order_event" : "confirm"})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_start_cook():
	req = session.post(api_url + "order_event", json={"order_id" : 1, "order_event" : "start_cook"})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_cooked():
	req = session.post(api_url + "order_event", json={"order_id" : 1, "order_event" : "cooked"})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_deliver():
	req = session.post(api_url + "order_event", json={"order_id" : 1, "order_event" : "deliver"})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_pay():
	req = session.post(api_url + "order_event", json={"order_id" : 1, "order_event" : "pay"})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_cancel():
	req = session.post(api_url + "order_event", json={"order_id" : 3, "order_event" : "cancel"})
	if verbose:
		print(req.text)
	return req.status_code

tests = [
	test_order_event_no_id,
	test_order_event_no_event,
	test_order_event_invalid_id,
	test_order_event_invalid_event,
	test_order_event_start_cook,
	test_order_event_cooked,
	test_order_event_deliver,
	test_order_event_pay,
	test_order_event_cancel,
]

if __name__ == "__main__":
	if len(sys.argv) > 1 and sys.argv[1] == "v":
		verbose = True
	tester.run_tests(tests)
