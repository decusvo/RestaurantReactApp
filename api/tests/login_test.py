import requests, json, sys
try:
	from . import tester, session_test
except:
	import tester, session_test

session = requests.Session()
session_test.session = session
session_test.verbose = True

verbose = False

user_data = {
			"email" : "example@example.com",
			"password" : "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86",
			"staff_login" : False,
			}

staff_data = {
			"email" : "waiter@waiter.com",
			"password" : "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86",
			"staff_login" : True,
			}

api_url = "http://localhost:5000/"

def test_user_login():
	req = session.post(api_url + "login", json=user_data)
	if verbose:
		print(req.text)
	return req.status_code

def test_staff_login():
	req = session.post(api_url + "login", json=staff_data)
	if verbose:
		print(req.text)
	return req.status_code

def test_bad_user_login():
	bad_data = user_data
	bad_data["password"] = "BAD"
	req = session.post(api_url + "login", json=bad_data)
	if verbose:
		print(req.text)
	return req.status_code

def test_bad_staff_login():
	bad_data = staff_data
	bad_data["password"] = "BAD"
	req = session.post(api_url + "login", json=bad_data)
	if verbose:
		print(req.text)
	return req.status_code
	
def test_logout():
	req = session.post(api_url + "logout")
	if verbose:
		print(req.text)
	return req.status_code

tests = [
		test_user_login,
		session_test.test_get_session_id,
		session_test.test_get_session_is_staff,
		test_logout,
		test_staff_login,
		session_test.test_get_session_id,
		session_test.test_get_session_is_staff,
		test_logout,
		test_bad_user_login,
		test_bad_staff_login,
		test_logout,
		session_test.test_get_session_id,
		session_test.test_get_session_is_staff,
		]

if __name__ == "__main__":
	if len(sys.argv) > 1 and sys.argv[1] == "v":
		verbose = True
	tester.run_tests(tests)

