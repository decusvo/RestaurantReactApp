import requests, json, sys
import tester

session = requests.Session()

verbose = False

user_data = {
			"email" : "example@example.com",
			"password" : "password",
			"staff_login" : False,
			}

staff_data = {
			"email" : "waiter@waiter.com",
			"password" : "supersecurepassword",
			"staff_login" : True,
			}

api_url = "http://localhost:5000/"

def test_user_login():
	req = session.post(api_url + "login", json=user_data)
	if verbose:
		print(req.text)
	req = session.get(api_url)
	return req.status_code

def test_staff_login():
	req = session.post(api_url + "login", json=staff_data)
	if verbose:
		print(req.text)
	req = session.get(api_url)
	return req.status_code

def test_bad_user_login():
	bad_data = user_data
	bad_data["password"] = "BAD"
	req = session.post(api_url + "login", json=bad_data)
	if verbose:
		print(req.text)
	req = session.get(api_url)
	return req.status_code

def test_bad_staff_login():
	bad_data = staff_data
	bad_data["password"] = "BAD"
	req = session.post(api_url + "login", json=bad_data)
	if verbose:
		print(req.text)
	req = session.get(api_url)
	return req.status_code
	

tests = [
		test_user_login,
		test_staff_login,
		test_bad_user_login,
		test_bad_staff_login,
		]

if len(sys.argv) > 1 and sys.argv[1] == "v":
		verbose = True
tester.run_tests(tests)






