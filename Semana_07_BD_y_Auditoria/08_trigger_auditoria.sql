CREATE TABLE `auditoria` (
  `id_auditoria` int unsigned NOT NULL AUTO_INCREMENT,
  `tabla` varchar(45) NOT NULL,
  `id` int NOT NULL,
  `campo` varchar(45) NOT NULL,
  `valor_anterior` varchar(255) NOT NULL,
  `valor_actual` varchar(255) NOT NULL,
  `fecha_hora_modificacion` datetime NOT NULL,
  PRIMARY KEY (`id_auditoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DELIMITER $$
CREATE TRIGGER tgr_actor_update AFTER UPDATE ON actor FOR EACH ROW
BEGIN
    IF OLD.first_name <> NEW.first_name THEN
        INSERT INTO auditoria (tabla, id, campo, valor_anterior, valor_nuevo, fecha_hora_modificacion)
        VALUES ('actor', OLD.actor_id, 'first_name', OLD.first_name, NEW.first_name, NOW());
    END IF;
    
    IF OLD.last_name <> NEW.last_name THEN
        INSERT INTO auditoria (tabla, id, campo, valor_anterior, valor_nuevo, fecha_hora_modificacion)
        VALUES ('actor', OLD.actor_id, 'last_name', OLD.last_name, NEW.last_name, NOW());
    END IF;
END;
$$
DELIMITER ;
;
