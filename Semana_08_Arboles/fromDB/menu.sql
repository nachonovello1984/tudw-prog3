DELIMITER $$

CREATE TABLE menu (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    idPadre INT NULL,
    orden INT NOT NULL,
    FOREIGN KEY (idPadre) REFERENCES menu(id)
);

INSERT INTO menu (id, nombre, idPadre, orden) VALUES (1, 'Inicio', NULL, 1);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (2, 'Productos', NULL, 2);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (3, 'Servicios', NULL, 3);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (4, 'Contacto', NULL, 4);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (5, 'Nosotros', NULL, 5);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (6, 'Electrónica', 2, 6);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (7, 'Ropa', 2, 7);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (8, 'Hogar', 2, 8);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (9, 'Teléfonos', 6, 9);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (10, 'Computadoras', 6, 10);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (11, 'Televisores', 6, 11);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (12, 'Consultoría', 3, 12);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (13, 'Soporte Técnico', 3, 13);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (14, 'Instalación', 3, 14);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (15, 'Empresarial', 12, 15);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (16, 'Personal', 12, 16);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (17, 'Electrodomésticos', 14, 17);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (18, 'Sistemas de Seguridad', 14, 18);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (19, 'Historia', 5, 19);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (20, 'Equipo', 5, 20);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (21, 'Misión y Visión', 5, 21);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (22, 'Directivos', 20, 22);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (23, 'Personal Técnico', 20, 23);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (24, 'Administración', 20, 24);
INSERT INTO menu (id, nombre, idPadre, orden) VALUES (25, 'Formulario de Contacto', 4, 25);

$$