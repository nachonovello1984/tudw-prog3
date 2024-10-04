import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conexion = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_HOST, 
    password: process.env.DB_NAME, 
});


export default conexion;