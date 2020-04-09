from . import login_test, session_test, menu_test, order_test, notification_test
from . import tester
import sys


if len(sys.argv) > 1 and sys.argv[1] == "v":
	login_test.verbose = True
	session_test.verbose = True
	menu_test.verbose = True
	order_test.verbose = True
	notification_test.verbose = True

total = 0
passed = 0
failed = []
total, passed, failed = tester.run_tests(login_test.tests, total, passed, failed)
total, passed, failed = tester.run_tests(session_test.tests, total, passed, failed)
total, passed, failed = tester.run_tests(menu_test.tests, total, passed, failed)
total, passed, failed = tester.run_tests(order_test.tests, total, passed, failed)
total, passed, failed = tester.run_tests(notification_test.tests, total, passed, failed)

tester.print_results(total, passed, failed)

