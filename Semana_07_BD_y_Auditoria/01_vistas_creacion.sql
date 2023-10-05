CREATE OR REPLACE VIEW v_actor_appearance
 	AS 
 	SELECT a.first_name, a.last_name, COUNT(fa.film_id) AS appearance_count
 	FROM film_actor AS fa
 	INNER JOIN actor AS a ON a.actor_id = fa.actor_id
 	GROUP BY fa.actor_id;

SELECT * FROM v_actor_appearance ORDER BY appearance_count DESC;
