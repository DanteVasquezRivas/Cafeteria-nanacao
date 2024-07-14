CREATE DATABASE cafeteria;
\c cafeteria;
CREATE TABLE cafes ( id SERIAL, nombre VARCHAR(100) NOT NULL);


-- Insertar 10 datos reales en la tabla cafes
INSERT INTO cafes (nombre) VALUES
('Espresso'),
('Americano'),
('Cappuccino'),
('Latte'),
('Mocha'),
('Macchiato'),
('Flat White'),
('Cortado'),
('Affogato'),
('Ristretto');



SELECT * FROM cafes;

