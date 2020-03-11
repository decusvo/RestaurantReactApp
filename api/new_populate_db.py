import populate_db
import requests


def populate_db():
	
	populate_db.populate()

	create_data()

def create_data():
	
	url = "http://localhost:5000/create_order"
	# TODO STUB
	
	# add orders via api

	# add notifications via api


