import login_test, session_test, menu_test, tester
import sys

if len(sys.argv) > 1 and sys.argv[1] == "v":
	login_test.verbose = True
	session_test.verbose = True
	menu_test.verbose = True

tester.run_tests(login_test.tests)
tester.run_tests(session_test.tests)
tester.run_tests(menu_test.tests)

