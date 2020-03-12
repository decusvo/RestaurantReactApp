import requests, json, sys
try:
	from . import tester
except:
	import tester

session = requests.Session()

verbose = False

test_data = {
			"username" : "example@example.com",
			"password" : "password"
			}

api_url = "http://localhost:5000/"

def test_create_order_without_table_num():
	req = session.post(api_url + "create_order", json={"items" : [1, 2, 3]})
	if verbose:
		print(req.text)
	return req.status_code

def test_create_order_without_items():
	req = session.post(api_url + "create_order", json={"table_num" : 2})
	if verbose:
		print(req.text)
	return req.status_code

def test_create_order_invalid_items():
	req = session.post(api_url + "create_order", json={"table_num" : 2, "items" : 4, "customer" : "example@example.com"})
	if verbose:
		print(req.text)
	return req.status_code
def test_create_order_excessive_items():
	req = session.post(api_url + "create_order", json={"table_num" : 2, "items" : ([1] * 101), "customer" : "example@example.com"})
	if verbose:
		print(req.text)
	return req.status_code

def test_create_order_invalid_table_num():
	req = session.post(api_url + "create_order", json={"table_num" : -1, "items" : [1], "customer" : "example@example.com"})
	if verbose:
		print(req.text)
	return req.status_code
	
def test_create_order_invalid_menu_item_id():
	req = session.post(api_url + "create_order", json={"table_num" : 1, "items" : [100], "customer" : "example@example.com"})
	if verbose:
		print(req.text)
	return req.status_code

def test_create_order():
	req = session.post(api_url + "create_order", json={"table_num" : 1, "items" : [1,5, 10, 7, 7], "customer" : "example@example.com"})
	if verbose:
		print(req.text)
	return req.status_code

def test_get_all_orders():
	req = session.post(api_url + "get_orders", json={"states" : []})
	if verbose:
		print(req.text)
	return req.status_code

def test_get_requested_orders():
	req = session.post(api_url + "get_orders", json={"states" : ["requested"]})
	if verbose:
		print(req.text)
	return req.status_code

def test_get_requested_and_cooking_orders():
	req = session.post(api_url + "get_orders", json={"states" : ["requested", "cooking"]})
	if verbose:
		print(req.text)
	return req.status_code

tests = [
		test_create_order_without_table_num,
		test_create_order_without_items,
		test_create_order_invalid_items,
		test_create_order_excessive_items,
		test_create_order_invalid_table_num,
		test_create_order_invalid_menu_item_id,
		test_create_order,
		test_get_all_orders,
		test_get_requested_orders,
		test_get_requested_and_cooking_orders,
		]

valid_order_id = None

def get_valid_order_id():
	global valid_order_id
	if valid_order_id:
		return valid_order_id
	valid_order_req = session.post(api_url + "create_order", json={"table_num" : 1, "items" : [1]})
	valid_order_id = valid_order_req.json().get("data")["order_id"]
	return valid_order_id

if __name__ == "__main__":
	if len(sys.argv) > 1 and sys.argv[1] == "v":
			verbose = True
	tester.run_tests(tests)








