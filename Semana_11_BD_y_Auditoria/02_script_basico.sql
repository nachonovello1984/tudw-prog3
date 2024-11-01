DELIMITER $$
BEGIN;

SET @mi_variable = 'Hola MySQL!';
SELECT @mi_variable AS resultado;
END$$
DELIMITER ;
;
