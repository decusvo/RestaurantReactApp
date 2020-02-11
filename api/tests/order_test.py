import requests, json, sys
import tester

session = requests.Session()

verbose = False

test_data = {
			"username" : "example@example.com",
			"password" : "password"
			}

api_url = "http://localhost:5000/"

def test_create_order_without_table_num():
	req = session.get(api_url + "create_order", json={"items" : [1, 2, 3]})
	if verbose:
		print(req.text)
	req = session.get(api_url)
	return req.status_code

def test_create_order_without_items():
	req = session.get(api_url + "create_order", json={"table_num" : 2})
	if verbose:
		print(req.text)
	req = session.get(api_url)
	return req.status_code

def test_create_order_invalid_items():
	# TODO
def test_create_order_excessive_items():
	# TODO

tests = [
		test_create_order_without_table_num,
		test_create_order_without_items,
		]
if __name__ == "__main__":
	if len(sys.argv) > 1 and sys.argv[1] == "v":
			verbose = True
	tester.run_tests(tests)






