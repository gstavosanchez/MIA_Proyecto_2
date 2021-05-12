/*
    HABILITADO = 1
    DESHABILITADO = 0
*/
INSERT INTO Tipo(nombre) VALUES ('cliente');
INSERT INTO Tipo(nombre) VALUES ('admin');

INSERT INTO Membresia(nombre,precio) VALUES('gold',900.00);
INSERT INTO Membresia(nombre,precio) VALUES('silver',450.00);
INSERT INTO Membresia(nombre,precio) VALUES('bronze',150.00);
INSERT INTO Membresia(nombre,precio) VALUES('none',0.00);

SELECT * FROM Usuario;
SELECT * FROM Membresia;


call sp_insert_usuario('mia_khalifa','123','dulce','khalifa','12-03-1998','khalifa@gmail.com',1);
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

insert into DEPORTE(NOMBRE) VALUES ('futbol');

/** en go cambiar enviar una fecha y un timestamp */
call sp_insert_evento('01-03-2018','01-03-2018 10:47','barcelona','real madrid',2,1,'futbol','J1','2021-Q2');
call sp_insert_evento('01-02-2021','01-02-2021 10:47','barcelona','real madrid',2,1,'futbol','J1','2021-Q2');

CALL sp_insert_prediccion(3,2,'lana_rhoades','futbol','J1','2021-Q2','barcelona','real madrid');

select * from usuario ORDER by USER_NAME;
select COUNT(*) from Usuario;
select * from DEPORTE;
select * from TEMPORADA;
select COUNT(*) from TEMPORADA;
select * from DetalleUsuario;
SELECT COUNT(*) FROM DetalleUsuario;
select * from JORNADA;
SELECT COUNT(*) FROM JORNADA;
select * from EVENTO;
select COUNT(*) from EVENTO;
select * from PREDICCION;
select COUNT(*) from PREDICCION;


drop table  usuario;
drop table  DEPORTE;
drop table  TEMPORADA;
drop table DetalleUsuario;
drop table  JORNADA;
drop table  EVENTO;
drop table  PREDICCION;

drop table usuario
drop table JORNADA
delete from JORNADA 
-- OLD SYNTAX
SELECT j.JORANADA_ID,j.nombre , t.TEMPORADA_ID,t.NOMBRE
FROM JORNADA j,TEMPORADA t
WHERE j.JORANADA_ID = j.TEMPORADA_ID


SELECT JORNADA.joranada_ID, JORNADA.NOMBRE, TEMPORADA.TEMPORADA_ID,temporada.NOMBRE
FROM JORNADA
INNER JOIN TEMPORADA ON jornada.JORANADA_ID = temporada.TEMPORADA_ID

SELECT j.jornada_ID as ID, j.nombre, t.temporada_ID, t.nombre
FROM JORNADA j
INNER JOIN TEMPORADA t ON j.temporada_ID = t.temporada_ID


SELECT COUNT(*) FROM USUARIO WHERE TIPO_ID = 1;
SELECT * from USUARIO;

SELECT * from DETALLECLIENTE;

SELECT j.jornada_ID
FROM JORNADA j, TEMPORADA t
WHERE j.NOMBRE = 'J1'
AND t.nombre = '2021-Q2'



SELECT e.EVENTO_ID
FROM EVENTO e 
INNER JOIN DEPORTE d ON e.DEPORTE_ID = d.DEPORTE_ID
INNER JOIN JORNADA j ON e.JORNADA_ID = j.JORNADA_ID
INNER JOIN TEMPORADA t  ON j.TEMPORADA_ID = t.TEMPORADA_ID
WHERE e.equipo_local = 'barcelona'
AND e.equipo_visitante = 'real madrid'
AND j.NOMBRE = 'J1'
AND t.NOMBRE = '2021-Q2'
AND d.NOMBRE = 'futbol'


/* ====================================================================== */


SELECT * FROM JORNADA j, TEMPORADA t 
WHERE j.NOMBRE = 'J2' AND t.NOMBRE = '2018-Q10';


select * from JORNADA j 
inner join TEMPORADA t on j.temporada_ID = t.temporada_ID
WHERE j.NOMBRE = 'J2' AND t.NOMBRE = '2018-Q10';

DELETE FROM DEPORTE WHERE DEPORTE_ID

UPDATE DEPORTE SET NOMBRE = para,
                  COLOR = PARAM
WHERE DEPORTE_ID = dfsa



-- Total por membresia
SELECT u.USER_NAME, m.NOMBRE,m.PRECIO,t.NOMBRE
FROM DetalleUsuario du
INNER JOIN USUARIO u ON du.USUARIO_ID = u.USUARIO_ID
INNER JOIN TEMPORADA t ON du.TEMPORADA_ID = t.TEMPORADA_ID
INNER JOIN MEMBRESIA m ON du.MEMBRESIA_ID = m. MEMBRESIA_ID
WHERE t.NOMBRE = '2019-Q4';