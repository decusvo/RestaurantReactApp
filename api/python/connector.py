# CHANGE DB NAME:
db_name = "test"
# CHANGE USER:
user = "postgres"
# CHANGE DB PASSWORD:
password = "test"
##################################################################################################

import psycopg2

# This method should be called from all other locations when a new connection to the database is needed
def get_connection():
	connection = psycopg2.connect(database=db_name, user=user, password=password)
	return connection

