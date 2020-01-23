DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS waiter CASCADE;
DROP TABLE IF EXISTS tables CASCADE;
DROP TABLE IF EXISTS food_type CASCADE;
DROP TABLE IF EXISTS menu CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS ordered_items CASCADE;
DROP TABLE IF EXISTS order_events CASCADE; 

-- Credit for order events and function:
-- https://felixge.de/2017/07/27/implementing-state-machines-in-postgresql.html

CREATE TABLE customer(
	customer_id INTEGER PRIMARY KEY,
	email varchar(128),
	firstname varchar(64),
	lastname varchar(64),
	password varchar(256)
);

CREATE TABLE waiter(
	waiter_id INTEGER PRIMARY KEY,
	email varchar(128) UNIQUE,
	firstname varchar(64),
	lastname varchar(64),
	phone_number INTEGER,
	password varchar(256)
);

CREATE TABLE tables(
	table_number INTEGER PRIMARY KEY,
	waiter_id INTEGER
);

CREATE TABLE food_type(
	id INTEGER PRIMARY KEY,
	type varchar(15)
);

CREATE TABLE menu(
	id INTEGER PRIMARY KEY,
	name varchar(128),
	description varchar(512),
	vegan boolean,
	gluten_free boolean,
	calories INTEGER,
	price INTEGER,
	available boolean,
	food_type INTEGER REFERENCES food_type(id)
);

CREATE TABLE orders(
	id INTEGER PRIMARY KEY,
	table_number INTEGER REFERENCES tables(table_number)
);
	
CREATE TABLE ordered_items(
	order_id INTEGER REFERENCES orders(id),
	menu_item_id INTEGER REFERENCES menu(id)
);
