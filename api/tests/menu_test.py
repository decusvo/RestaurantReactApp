import requests, json, sys
from . import tester

session = requests.Session()

verbose = False

api_url = "http://localhost:5000/"

def test_get_menu():
	req = session.get(api_url + "menu")
	if verbose:
		print(req.text)
	req = session.get(api_url)
	return req.status_code
	

# TODO add tests for selecting specific menu groups (allergy etc.)

tests = [
		test_get_menu,
		]

if __name__ == "__main__":
	if len(sys.argv) > 1 and sys.argv[1] == "v":
		verbose = True
	tester.run_tests(tests)

