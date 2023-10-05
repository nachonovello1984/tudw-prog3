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

const find = async (username, password) => {
    // Defino el string de consulta
    const strSql = `SELECT user_id AS userId, first_name AS firstName, last_name AS lastName, rol
                    FROM users u
                    WHERE u.username = ? AND u.pass = SHA2(?, 256) AND activo = 1`;

    // Ejecuto la consulta
    const [rows] = await pool.query(strSql, [username, password]);

    return rows[0];
};

const findById = async (userId) => {
    // Defino el string de consulta
    const strSql =  `SELECT user_id AS userId, username, first_name AS firstName, last_name AS lastName, rol
                    FROM users 
                    WHERE user_id = ? AND activo = 1`;

    // Ejecuto la consulta
    const [rows] = await pool.query(strSql, [userId]);

    return rows[0];
};

module.exports = { find, findById };