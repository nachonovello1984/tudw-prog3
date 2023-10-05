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

const findById = async (rentalId) => {
    const strSql = `SELECT rental_id as rentalId, rental_date as rentalDate, inventory_id AS inventoryId, customer_id AS customerId, return_date AS returnDate, staff_Id AS staffId, last_update AS lastUpdate 
                    FROM rental 
                    WHERE rental_id = ?`;

    const [rows] = await pool.query(strSql, [rentalId]);

    return rows;
};

const create = async ({ customerId, filmId, storeId, staffId }) => {
    const strSql = 'CALL sp_film_reservar(?, ?, ?, ?);';

    await pool.query(strSql, [customerId, filmId, storeId, staffId]);

    const [rows] = await pool.query('SELECT MAX(rental_id) AS rentalId FROM rental;');

    return findById(rows[0].rentalId);
};

module.exports = { findById, create };