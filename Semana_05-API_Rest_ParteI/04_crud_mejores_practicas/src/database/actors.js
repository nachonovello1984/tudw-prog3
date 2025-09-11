import BdUtils from "./dbUtils.js";

export default class Actors {

    findAll = async (filters = null, limit = 0, offset = 0, order = "actor_id", asc = "ASC") => {

        // Defino el string de consulta
        let strSql = `SELECT actor_id, first_name, last_name, last_update FROM actor `

        const filterValuesArray = [];

        if (filters) {
            strSql += "WHERE ";

            for (const filter of filters) {
                for (const clave of Object.keys(filter)) {
                    strSql += `${clave} = ? AND `;
                    filterValuesArray.push(filter[clave]);
                }    
            }

            //Quito el último AND
            strSql = strSql.substring(0, strSql.length - 4);
        }

        if (order) {
            strSql += ` ORDER BY ${order} ${asc}`;
        }

        if (limit) {
            strSql += 'LIMIT ? OFFSET ? ';
        }

        //Me conecto a la base de datos
        const conexion = await BdUtils.initConnection();

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [...filterValuesArray, limit, offset]);

        conexion.end();

        return rows;
    }

    findById = async (actorId) => {
        // Defino el string de consulta
        const strSql = `SELECT actor_id, first_name, last_name, last_update FROM actor WHERE actor_id = ?`;

        const conexion = await BdUtils.initConnection();

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [actorId]);

        conexion.end();

        return (rows.length > 0)? rows[0] : null;
    };

    create = async ({ firstName, lastName, lastUpdate }) => {
        const strSql = 'INSERT INTO actor (first_name, last_name, last_update) VALUES (?, ?, ?);';

        const conexion = await BdUtils.initConnection();

        await conexion.query(strSql, [firstName, lastName, lastUpdate]);

        const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS actorId');

        conexion.end();

        return this.findById(rows[0].actorId);
    };

    update = async (actorId, { firstName, lastName, lastUpdate }) => {
        const strSql = 'UPDATE actor SET first_name = ?, last_name = ?, last_update = ? WHERE actor_id = ?';

        const conexion = await BdUtils.initConnection();

        await conexion.query(strSql, [firstName, lastName, lastUpdate, actorId]);

        conexion.end();

        return this.findById(actorId);
    };

    destroy = async (actorId) => {
        const strSql = 'DELETE FROM actor WHERE actor_id = ?';

        const conexion = await BdUtils.initConnection();

        await conexion.query(strSql, [actorId]);

        conexion.end();
    }
};


