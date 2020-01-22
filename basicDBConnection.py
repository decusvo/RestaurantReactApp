import psycopg2

# code copied and modified from https://pynative.com/python-postgresql-tutorial/

try:
    connection = psycopg2.connect(user = "jrngriijazlzxr",
                                  password = "655c5947f8ad0f453bfd4b5d4b80d6374a3a97f706c4533a60be75c3de343817",
                                  host = "ec2-54-247-72-30.eu-west-1.compute.amazonaws.com",
                                  port = "5432",
                                  database = "d9vtdql067f73n")

    cursor = connection.cursor()
    # Print PostgreSQL Connection properties
    print ( connection.get_dsn_parameters(),"\n")

    # Print PostgreSQL version
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("You are connected to - ", record,"\n")

except (Exception, psycopg2.Error) as error :
    print ("Error while connecting to PostgreSQL", error)
finally:
    #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
