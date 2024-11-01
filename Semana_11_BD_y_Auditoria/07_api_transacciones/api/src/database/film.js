//Uso dotenv para levantar el archivo de configuración .env
require('dotenv').config();

//Uso mysql2/promise para conectarme a MySQL usando promises
const mysql = require("mysql2/promise");

// Creo el pool de conexión
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const findAll = async (filter = null, limit = 0, offset = 0, order = "actor_id", asc = "ASC") => {

    // Defino el string de consulta
    let strSql = `  SELECT film_id AS filmId, title, description, release_year AS releaseYear 
                    FROM sakila.film`
            
    // Ejecuto la consulta
    const [rows] = await pool.query(strSql);
    return rows;
 
};

module.exports = {findAll};