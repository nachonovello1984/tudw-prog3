import mysql from 'mysql2/promise';

const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'nacho',
    database: 'sakila',
    password: 'abc.1234',
});

export default conexion;