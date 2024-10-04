//Uso dotenv para levantar el archivo de configuración .env
import dotenv from 'dotenv'
dotenv.config();

import conexion from "./conexion.js"

class Film {

    findAll = async (filter = null, limit = 0, offset = 0, order = "film_id", asc = "ASC") => {

        // Defino el string de consulta
        let strSql = `  SELECT film_id AS filmId, title, description, release_year AS releaseYear 
                    FROM sakila.film
                    ORDER BY ${order} ${asc}`

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql);
        return rows;
    };
}

export default Film;