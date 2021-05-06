INSERT INTO Tipo(nombre) VALUES ('cliente');
INSERT INTO Tipo(nombre) VALUES ('admin');

INSERT INTO Membresia(nombre,precio) VALUES('gold',900.00);
INSERT INTO Membresia(nombre,precio) VALUES('silver',450.00);
INSERT INTO Membresia(nombre,precio) VALUES('bronze',150.00);
INSERT INTO Membresia(nombre,precio) VALUES('none',0.00);

SELECT * FROM Usuario;
SELECT * FROM Membresia;


call sp_insert_usuario('mia_khalifa','123','dulce','khalifa','12-03-1998','khalifa@gmail.com',4);
call sp_insert_usuario('lana_rhoades','123','lana','rhoades','12-03-1995','lana@gmail.com',1);
update USUARIO SET MEMBRESIA_ID = 1 where USUARIO_ID = 2
call sp_insert_detalle_cliente('lana_rhoades','2021-Q2','gold')
call sp_insert_detalle_cliente('mia_khalifa','2021-Q2','gold')  

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


commit;

CALL sp_insert_temporada('2021-Q2','01-02-2021');

CALL sp_insert_jornada('J1','2021-Q2');
CALL sp_insert_jornada('J2','2021-Q2');
CALL sp_insert_jornada('J3','2021-Q2');
CALL sp_insert_jornada('J4','2021-Q2');

select * from TEMPORADA where nombre='2021-Q52';

select * from JORNADA


drop table JORNADA
drop table TEMPORADA
-- OLD SYNTAX
SELECT j.JORANADA_ID,j.nombre , t.TEMPORADA_ID,t.NOMBRE
FROM JORNADA j,TEMPORADA t
WHERE j.JORANADA_ID = j.TEMPORADA_ID


SELECT JORNADA.joranada_ID, JORNADA.NOMBRE, TEMPORADA.TEMPORADA_ID,temporada.NOMBRE
FROM JORNADA
INNER JOIN TEMPORADA ON jornada.JORANADA_ID = temporada.TEMPORADA_ID

SELECT j.joranada_ID as ID, j.nombre, t.temporada_ID, t.nombre
FROM JORNADA j
INNER JOIN TEMPORADA t ON j.joranada_ID = t.temporada_ID


SELECT COUNT(*) FROM USUARIO WHERE TIPO_ID = 1;
SELECT * from USUARIO;

SELECT * from DETALLECLIENTE;
drop table DetalleCliente
drop table EQUIPO