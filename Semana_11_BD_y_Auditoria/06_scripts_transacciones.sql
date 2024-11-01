DELIMITER $$
CREATE PROCEDURE sp_film_reservar(p_customer_id INT, p_film_id INT, p_store_id INT, p_staff_id INT)
BEGIN

-- Declaración de variables
DECLARE v_inventory_id INTEGER;

-- Inicio la transacción
SET autocommit = 0;

START TRANSACTION;

-- Busco el id de inventario
SELECT inventory_id INTO v_inventory_id
FROM inventory 
WHERE film_id = p_film_id AND store_id = p_store_id
LIMIT 1;

-- Verifico si la búsqueda anterior arrojó resultados
IF v_inventory_id IS NOT NULL THEN

    -- Modifico la fecha de actualización del item de inventario
    UPDATE inventory
    SET last_update = NOW()
    WHERE inventory_id = v_inventory_id;

    -- Registro el alquiler en rental
    INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, staff_id)
    VALUES (NOW(), v_inventory_id, p_customer_id, NULL, p_staff_id);

    -- Confirmo la transacción
    COMMIT;
    
    SELECT 'Film alquilado con éxito.' AS result;
ELSE
    -- Vuelvo atrás la transacción si no encontré ningún ítem.
    ROLLBACK;
    
    SELECT 'No se encontró un film para alquilar.' AS result;
END IF;


SET autocommit = 1;

END $$
DELIMITER ;
;

CALL sp_film_reservar(1, 1, 1, 1);
-- DROP PROCEDURE sp_film_reservar;