DELIMITER $$
CREATE FUNCTION fn_control_flujo_repeat(n INT)
	RETURNS VARCHAR(100)
READS SQL DATA DETERMINISTIC
BEGIN
	DECLARE countdown INTEGER;
    DECLARE resultado VARCHAR(100);
    
    SET countdown = n;
    SET resultado = '';

	REPEAT
		SET resultado = CONCAT(resultado, CONVERT(countdown, CHAR(100)), ', ');
		SET countdown = countdown - 1;
		UNTIL countdown = 0
	END REPEAT;

RETURN resultado;
END $$

DELIMITER ;


SELECT fn_control_flujo_repeat(10);
-- DROP FUNCTION fn_control_flujo_repeat;