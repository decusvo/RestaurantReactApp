/*
	Order States:
		- start
		- requested
		- confirmed
		- cooking
		- delivered
		- paid
		- cancelled

	Order Events:
		- request
		- confirm
		- start_cook
		- deliver
		- pay
		- cancel
*/
DROP TABLE IF EXISTS order_events CASCADE

CREATE TABLE order_events(
	id serial PRIMARY KEY,
	order_id INTEGER REFERENCES orders(id) NOT NULL,
	event varchar(20) NOT NULL
);

DROP FUNCTION IF EXISTS order_event_transition;

CREATE FUNCTION order_event_transition(state text, event text) RETURNS text 
LANGUAGE sql AS
$$
	SELECT CASE state	
		WHEN 'start' THEN
			CASE event
				WHEN 'request' THEN 'requested'
				ELSE 'error'
			END

		WHEN 'requested' THEN
			CASE event
				WHEN 'confirm' THEN 'confirmed'
				ELSE 'error'
			END
	
		WHEN 'confirmed' THEN
			CASE event
				WHEN 'cancel' THEN 'cancelled'
				WHEN 'start_cook' THEN 'cooking'
				ELSE 'error'
			END

		WHEN 'cooking' THEN
			CASE event
				WHEN 'cancel' THEN 'cancelled'
				WHEN 'deliver' THEN 'delivered'
				ELSE 'error'
			END

		WHEN 'delivered' THEN
			CASE event
				WHEN 'pay' THEN 'paid'
				ELSE 'error'
			END
	END
$$;

