//Uso dotenv para levantar el archivo de configuración .env
import dotenv from "dotenv";
dotenv.config();

//Uso mysql2/promise para conectarme a MySQL usando promises
import mysql from "mysql2/promise";

export default class Actors {

    constructor() {
        // Creo la conexión usando await para asegurar que se conecta correctamente
        this.initConnection();
    }

    // Método para inicializar la conexión correctamente con manejo de errores
    async initConnection() {
        try {
            this.conexion = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        } catch (error) {
            throw new Error("No se pudo establecer conexión con la Base de Datos.")
        }
    }

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
        const [rows] = await this.conexion.query(strSql, [...filterValuesArray, limit, offset]);
        return rows;

    }

    findById = async (actorId) => {
        // Defino el string de consulta
        const strSql = `SELECT actor_id AS actorId, first_name AS firstName, last_name AS lastName, last_update AS lastUpdate 
                    FROM actor 
                    WHERE actor_id = ?`;

        // Ejecuto la consulta
        const [rows] = await this.conexion.query(strSql, [actorId]);

        return (rows.length > 0)? rows[0] : null;
    };

    create = async ({ firstName, lastName, lastUpdate }) => {
        const strSql = 'INSERT INTO actor (first_name, last_name, last_update) VALUES (?, ?, ?);';

        await conexion.query(strSql, [firstName, lastName, lastUpdate]);

        const [rows] = await this.conexion.query('SELECT LAST_INSERT_ID() AS actorId');

        return findById(rows[0].actorId);
    };

    update = async (actorId, { firstName, lastName, lastUpdate }) => {

        const strSql = 'UPDATE actor SET first_name = ?, last_name = ?, last_update = ? WHERE actor_id = ?';

        await this.conexion.query(strSql, [firstName, lastName, lastUpdate, actorId]);

        return findById(actorId);
    };

    destroy = async (actorId) => {
        const strSql = 'DELETE FROM actor WHERE actor_id = ?';

        await this.conexion.query(strSql, [actorId]);
    }
};


