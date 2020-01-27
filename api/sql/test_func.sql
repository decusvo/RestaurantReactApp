SELECT state, event, order_event_transition(state, event)
FROM (VALUES
('start', 'request'),
('requested', 'confirm'),
('confirmed', 'cook'),
('cooking', 'deliver'),
('delivered', 'pay'),
('cooking', 'cancel'),
('confirmed', 'cancel')
) AS examples(state, event);

INSERT INTO orders(id, table_number) VALUES(1, 1);

INSERT INTO order_events(order_id, event) VALUES(1, 'request');
