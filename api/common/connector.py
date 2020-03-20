# CHANGE DB NAME:
db_name = "det863at6goa6t"
# CHANGE USER:
user = "gqyafrbphewugd"
# CHANGE DB PASSWORD:
password = "f1365952e1828e5775397e682500bd1fd1a04297effd3eb40c240c0884a28cfb"
# CHANGE DB HOST:
host  = "ec2-54-217-204-34.eu-west-1.compute.amazonaws.com"
# CHANGE PORT:
port = "5432"

##################################################################################################

import psycopg2

val = None
connection = None

def exit():
	global connection
	if connection:
		connection.close()
		connection = None

def execute_query(query_string, args=None):
	global connection
	if not connection:
		connection = get_connection()
	cursor = connection.cursor()
	result = None
	try:
		if args:
			cursor.execute(query_string, args)
		else:
			cursor.execute(query_string)
		connection.commit()
		result = cursor.fetchall()

	except:
		print("Query failed")
		cursor.close()
		raise
		result = None

	finally:
		cursor.close()

	return result

# this is necessary because insert querys return None on mosts occasions
# we also need to handle insert statement failures differently
def execute_insert_query(query_string, args=None):
	global connection
	if not connection:
		connection = get_connection()
	cursor = connection.cursor()
	try:
		if args:
			cursor.execute(query_string, args)
		else:
			cursor.execute(query_string)
		connection.commit()
	except (Exception, psycopg2.Error) as error:
		print("Query failed")
		cursor.execute("ROLLBACK")
		raise
		connection.commit()
		return False
	finally:
		cursor.close()

	return True

def json_select(query, args=None):
	global connection
	connection = get_connection()
	cursor = connection.cursor()
	# cant use %s and pass the query as an arugment to execute_query
	# because it thinks its an sql injection
	json_query = "SELECT TO_JSON(json_result) FROM ({})json_result;".format(query)
	return execute_query(json_query)

def get_connection():
	global connection
	if connection:
		return connection
	connection = psycopg2.connect(database=db_name, user=user, password=password, host=host)
	return connection

def __init__():
	global connection
	connection = psycopg2.connect(database=db_name, user=user, password=password, host=host)
