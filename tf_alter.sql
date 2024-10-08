ALTER TABLE `reclamos`.`reclamos_tipo` 
CHANGE COLUMN `idReclamosTipo` `idReclamoTipo` INT NOT NULL AUTO_INCREMENT ;

ALTER TABLE `reclamos`.`reclamos_estado` 
CHANGE COLUMN `idReclamosEstado` `idReclamoEstado` INT NOT NULL AUTO_INCREMENT ;

ALTER TABLE `reclamos`.`reclamos_estado` 
RENAME TO  `reclamos`.`reclamos_estados` ;

ALTER TABLE `reclamos`.`reclamos_tipo` 
RENAME TO  `reclamos`.`reclamos_tipos` ;
