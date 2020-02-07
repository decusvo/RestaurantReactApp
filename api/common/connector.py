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

# This method should be called from all other locations when a new connection to the database is needed
def get_connection():
	connection = psycopg2.connect(database=db_name, user=user, password=password, host=host)
	return connection
