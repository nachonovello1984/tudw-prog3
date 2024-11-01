DELIMITER $$
CREATE FUNCTION fn_control_flujo_if(n INT)
	RETURNS VARCHAR(100)
READS SQL DATA DETERMINISTIC
BEGIN
	DECLARE s VARCHAR(100);
IF n = 0 THEN
	SET s = 'n es igual a 0';
ELSEIF n > 0 THEN
	SET s = 'n es mayor que 0';
ELSE 
	SET s = 'n es menor que 0';
END IF;

RETURN s;
END $$

DELIMITER ;


SELECT fn_control_flujo_if(1);