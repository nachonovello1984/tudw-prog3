DELIMITER $$
CREATE FUNCTION fn_actors_cursor()
RETURNS VARCHAR(8000)
	READS SQL DATA DETERMINISTIC
BEGIN
	DECLARE actor_id, cantidad INTEGER UNSIGNED;
 	DECLARE nombre VARCHAR(100);
    DECLARE res VARCHAR(8000);
    
 	DECLARE curs CURSOR FOR SELECT actor_id, CONCAT(last_name, ', ', first_name) AS nombre FROM actor;
 	OPEN curs;
    
    SET res = '';
    SELECT COUNT(*) INTO cantidad FROM actor;
        
 	WHILE cantidad > 0 DO
		FETCH curs INTO actor_id, nombre;
        SET cantidad = cantidad - 1;

        SET res = CONCAT(res, nombre, CHAR(13), CHAR(10));
 	END WHILE;
    
 	CLOSE curs;
    
	RETURN res;
END $$

DELIMITER ;


SELECT fn_actors_cursor();
-- DROP FUNCTION fn_actors_cursor();