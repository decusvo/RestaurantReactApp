
def run_tests(test_array):
	for test in test_array:
		print("\n\033[93mRUNNING TEST: " + test.__name__.upper() + "...\033[0m")
		code = test()
		if code // 100 == 2 or code // 100 == 3:
			print("\033[92mSUCCESS, HTML STATUS CODE:" + str(code) + "\033[0m")
		else:
			print("\033[91mFAILURE, HTML STATUS CODE:" + str(code) + "\033[0m")
