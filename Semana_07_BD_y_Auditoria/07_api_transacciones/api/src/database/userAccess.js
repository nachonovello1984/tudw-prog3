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

const findByUserId = async (userId) => {
    // Defino el string de consulta
    const strSql = `SELECT u.user_id, u.username, ua.fecha_hora, ua.host 
                    FROM users u
                    LEFT JOIN users_access ua ON u.user_id = ua.user_id
                    WHERE u.user_id = ?;`;

    // Ejecuto la consulta
    const [rows] = await pool.query(strSql, [userId]);

    return rows;
};

const create = async ({ userId, fechaHora, host }) => {
    // Defino el string de consulta
    const strSql = `INSERT INTO users_access (user_id, fecha_hora, host) VALUES (?, ?, ?);`;

    // Ejecuto la consulta
    await pool.query(strSql, [userId, fechaHora, host]);
};

module.exports = { findByUserId, create };