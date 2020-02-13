
def test_order_event_no_order_id():
	req = session.post(api_url + "order_event", json={"order_event" : "request"})
	if verbose:
		print(req.text)
	return req.status_code

def test_order_event_no_order_event():
	req = session.post(api_url + "order_event", json={"order_id" : "1"})
	if verbose:
		print(req.text)
	return req.status_code

