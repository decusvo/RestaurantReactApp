DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS waiter CASCADE;
DROP TABLE IF EXISTS table_details CASCADE;
DROP TABLE IF EXISTS item_type CASCADE;
DROP TABLE IF EXISTS menu CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS ordered_items CASCADE;

DROP TYPE IF EXISTS order_state CASCADE;

CREATE TYPE order_state AS ENUM (
		'start', 
		'requested', 
		'confirmed', 
		'cooking', 
		'ready_to_deliver', 
		'delivered', 
		'paid', 
		'cancelled',
		'error'
	);

-- Credit for order events and function:
-- https://felixge.de/2017/07/27/implementing-state-machines-in-postgresql.html

CREATE TABLE customer(
	email varchar(128) PRIMARY KEY,
	firstname varchar(64),
	lastname varchar(64),
	password varchar(256)
);

CREATE TABLE waiter(
	waiter_id serial PRIMARY KEY,
	email varchar(128) UNIQUE,
	firstname varchar(64),
	lastname varchar(64),
	phone_number integer,
	password varchar(256)
);

CREATE TABLE table_details(
	table_number serial PRIMARY KEY,
	waiter_id integer
);

CREATE TABLE item_type(
	id integer PRIMARY KEY,
	type varchar(15)
);

CREATE TABLE menu(
	id serial PRIMARY KEY,
	name varchar(128),
	description varchar(512),
	vegan boolean,
	gluten_free boolean,
	vegetarian boolean,
	calories integer,
	price money,
	available boolean,
	food_type integer REFERENCES item_type(id)
);

CREATE TABLE orders(
	id serial PRIMARY KEY,
	table_number integer REFERENCES table_details(table_number),
	state order_state DEFAULT 'start'
);

CREATE TABLE ordered_items(
	ordered_item_id serial PRIMARY KEY,
	order_id integer REFERENCES orders(id),
	menu_item_id integer REFERENCES menu(id)
);
