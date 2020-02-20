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

def test_server():
	req = session.get(api_url)
	return req.status_code

def test_create_session():
	req = session.post(api_url + "create_session", json={"username" : test_data["username"]})
	if verbose:
		print(req.text)
	return req.status_code

def test_get_session_id():
	req = session.post(api_url + "get_session_id")
	if verbose:
		print(req.text)
	return req.status_code

def test_get_session_is_staff():
	req = session.post(api_url + "get_session_is_staff")
	if verbose:
		print(req.text)
	return req.status_code

def test_remove_session():
	req = session.post(api_url + "remove_session", json={"username" : test_data["username"]})
	if verbose:
		print(req.text)
	req = session.get(api_url)
	return req.status_code

tests = [
		test_server,
		test_create_session,
		test_create_session,
		test_get_session_id,
		test_get_session_is_staff,
		test_remove_session,
		test_get_session_id,
		test_remove_session,
		]

if __name__ == "__main__":
	if len(sys.argv) > 1 and sys.argv[1] == "v":
			verbose = True
	tester.run_tests(tests)






