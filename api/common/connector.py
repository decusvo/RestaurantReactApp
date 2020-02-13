# CHANGE DB NAME:
db_name = "d9vtdql067f73n"
# CHANGE USER:
user = "jrngriijazlzxr"
# CHANGE DB PASSWORD:
password = "655c5947f8ad0f453bfd4b5d4b80d6374a3a97f706c4533a60be75c3de343817"
# CHANGE DB HOST:
host  = "ec2-54-247-72-30.eu-west-1.compute.amazonaws.com"
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
		result = None

	finally:
		cursor.close()

	return result

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
