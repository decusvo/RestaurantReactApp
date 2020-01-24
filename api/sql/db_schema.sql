DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS waiter CASCADE;
DROP TABLE IF EXISTS tables CASCADE;
DROP TABLE IF EXISTS item_type CASCADE;
DROP TABLE IF EXISTS menu CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS ordered_items CASCADE;
DROP TABLE IF EXISTS order_events CASCADE;

-- Credit for order events and function:
-- https://felixge.de/2017/07/27/implementing-state-machines-in-postgresql.html

CREATE TABLE customer(
	customer_id serial PRIMARY KEY,
	email varchar(128),
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

CREATE TABLE tables(
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
	id integer PRIMARY KEY,
	table_number integer REFERENCES tables(table_number),
	state varchar(20) DEFAULT 'start'
);

CREATE TABLE ordered_items(
	order_id integer REFERENCES orders(id),
	menu_item_id integer REFERENCES menu(id)
);
