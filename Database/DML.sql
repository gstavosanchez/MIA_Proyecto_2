INSERT INTO Tipo(nombre) VALUES ('cliente');
INSERT INTO Tipo(nombre) VALUES ('admin');

INSERT INTO Membresia(nombre,precio) VALUES('gold',900.00);
INSERT INTO Membresia(nombre,precio) VALUES('silver',450.00);
INSERT INTO Membresia(nombre,precio) VALUES('bronze',150.00);
INSERT INTO Membresia(nombre,precio) VALUES('none',0.00);

SELECT * FROM Usuario;
SELECT * FROM Membresia;


call sp_insert_usuario('dulce123','aaaaAAAA1aa','dulce','khalifa','12-03-1998','khalifa@gmail.com',1);  

INSERT INTO USUARIO(
    USER_NAME,
    PASS,
    NOMBRE,
    APELLIDO,
    FECHA_NACIMIENTO,
    FECHA_REGISTRO,
    EMAIL,
    TIPO_ID,
    MEMBRESIA_ID
  )
VALUES
  (
    'root',
    'root',
    'Gustavo',
    'Sanchez',
    (TO_DATE('27-08-1998', 'DD-MM-YYYY')),
    CURRENT_TIMESTAMP(2),
    'gustavosanchez@gmail.com',
    2,
    4
  );
