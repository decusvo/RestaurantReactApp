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
