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
    let strSql = `SELECT actor_id AS actorId, first_name AS firstName, last_name AS lastName, last_update AS lastUpdate FROM actor `
            
    const filterValuesArray = [];

    if (filter && Object.keys(filter).length > 0) {
        strSql += "WHERE ";
        for (const clave in filter) {
            strSql += `${clave} = ? AND `;

            filterValuesArray.push(filter[clave]);
        }

        strSql = strSql.substring(0, strSql.length - 4);
    }

    strSql += ` ORDER BY ${order} ${asc}`;
    
    if (limit) {
        strSql += 'LIMIT ? OFFSET ? ';
    }

    // Ejecuto la consulta
    const [rows] = await pool.query(strSql, [...filterValuesArray, limit, offset]);
    return rows;
    
};

const findById = async (actorId) => {
    // Defino el string de consulta
    const strSql = `SELECT actor_id AS actorId, first_name AS firstName, last_name AS lastName, last_update AS lastUpdate 
                    FROM actor 
                    WHERE actor_id = ?`;

    // Ejecuto la consulta
    const [rows] = await pool.query(strSql, [actorId]);
    
    return rows;
};

const create = async ({firstName, lastName, lastUpdate}) => {
    const strSql = 'INSERT INTO actor (first_name, last_name, last_update) VALUES (?, ?, ?);';

    await pool.query(strSql, [firstName, lastName, lastUpdate]);

    const [rows] = await pool.query('SELECT LAST_INSERT_ID() AS actorId');

    return findById(rows[0].actorId);
};

const update = async (actorId, {firstName, lastName, lastUpdate}) => {

    const strSql = 'UPDATE actor SET first_name = ?, last_name = ?, last_update = ? WHERE actor_id = ?';

    await pool.query(strSql, [firstName, lastName, lastUpdate, actorId]);

    return findById(actorId);
};

const destroy = async (actorId) => {
    const strSql = 'DELETE FROM actor WHERE actor_id = ?';

    await pool.query(strSql, [actorId]);
};

module.exports = { findAll, findById, create, update, destroy };


