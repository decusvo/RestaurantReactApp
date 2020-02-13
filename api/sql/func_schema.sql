/*
	Order States:
		- start
		- requested
		- confirmed
		- cooking
    - ready_to_deliver
		- delivered
		- paid
		- cancelled

	Order Events:
		- request
		- confirm
		- start_cook
    - cooked
		- deliver
		- pay
		- cancel
*/

--EVENT TABLE

DROP TABLE IF EXISTS order_events CASCADE;

CREATE TABLE order_events(
	id serial PRIMARY KEY,
	order_id INTEGER REFERENCES orders(id) NOT NULL,
	event varchar(20) NOT NULL
);

--FSM FUNCTION

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
				WHEN 'cooked' THEN 'ready_to_deliver'
				ELSE 'error'
			END
    WHEN 'ready_to_deliver' THEN
      CASE event
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

--FUNCTION TO CALL FROM TRIGGER

DROP FUNCTION IF EXISTS new_event;

CREATE FUNCTION new_event() RETURNS trigger AS
$$
DECLARE
	old_state varchar(50);
	new_event varchar(50);
	new_state varchar(20);
BEGIN
	SELECT NEW.event INTO new_event;
	SELECT state FROM orders WHERE orders.id = NEW.order_id INTO old_state;
	SELECT order_event_transition(old_state, new_event) INTO new_state;

	UPDATE orders SET state=new_state WHERE orders.id = NEW.order_id;
	RETURN NEW;
END
$$
LANGUAGE PLPGSQL;

--TRIGGER

CREATE TRIGGER event_trigger
AFTER INSERT
ON order_events
FOR EACH ROW
EXECUTE PROCEDURE new_event();
