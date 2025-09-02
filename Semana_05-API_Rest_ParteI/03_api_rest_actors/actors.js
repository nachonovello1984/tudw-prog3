//Uso dotenv para levantar el archivo de configuración .env
import dotenv from 'dotenv';
//Uso mysql2/promise para conectarme a MySQL usando promises
import mysql from "mysql2/promise";
dotenv.config();

const findAll = async () => {
    try {

        // Creo la conexión
        const conexion = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // Defino el string de consulta
        const sqlQuery = 'SELECT * FROM actor';

        // Ejecuto la consulta
        const [rows] = await conexion.query(sqlQuery);

        await conexion.end();

        return rows;

    } catch (err) {
        console.error('Error executing SELECT query:', err);
    }
}

const findById = async (id) => {
    try {

        // Creo la conexión
        const conexion = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // Defino el string de consulta
        const sqlQuery = 'SELECT * FROM actor WHERE actor_id = ?';

        // Ejecuto la consulta
        const [rows] = await conexion.query(sqlQuery, [id]);

        await conexion.end();

        return rows;

    } catch (err) {
        console.error('Error executing SELECT query:', err);
    }
}

export { findAll, findById };


