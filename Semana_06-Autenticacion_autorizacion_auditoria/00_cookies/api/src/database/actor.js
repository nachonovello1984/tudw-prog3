//Uso dotenv para levantar el archivo de configuración .env
import dotenv from 'dotenv'
dotenv.config();

import conexion from './conexion.js'

class Actor {

    findAll = async (filter = null, limit = 0, offset = 0, order = "actor_id", asc = "ASC") => {

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
        const [rows] = await conexion.query(strSql, [...filterValuesArray, limit, offset]);
        return rows;

    };

    findById = async (actorId) => {
        // Defino el string de consulta
        const strSql = `SELECT actor_id AS actorId, first_name AS firstName, last_name AS lastName, last_update AS lastUpdate 
                    FROM actor 
                    WHERE actor_id = ?`;

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [actorId]);

        return rows;
    };

    create = async ({ firstName, lastName, lastUpdate }) => {
        const strSql = 'INSERT INTO actor (first_name, last_name, last_update) VALUES (?, ?, ?);';

        await pool.query(strSql, [firstName, lastName, lastUpdate]);

        const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS actorId');

        return findById(rows[0].actorId);
    };

    update = async (actorId, { firstName, lastName, lastUpdate }) => {

        const strSql = 'UPDATE actor SET first_name = ?, last_name = ?, last_update = ? WHERE actor_id = ?';

        await conexion.query(strSql, [firstName, lastName, lastUpdate, actorId]);

        return findById(actorId);
    };

    destroy = async (actorId) => {
        const strSql = 'DELETE FROM actor WHERE actor_id = ?';

        await conexion.query(strSql, [actorId]);
    };

}
export default Actor;


