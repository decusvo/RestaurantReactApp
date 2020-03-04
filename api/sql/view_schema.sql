DROP VIEW IF EXISTS ordered_items_and_price;
DROP VIEW IF EXISTS total_order_price;

CREATE VIEW ordered_items_and_price AS
	SELECT ordered_item_id, order_id, menu_item_id, price
	FROM menu, ordered_items
	WHERE menu_item_id = id;

CREATE VIEW total_order_price AS
	SELECT order_id, sum(price) AS price
	FROM ordered_items_and_price
	GROUP BY order_id;
