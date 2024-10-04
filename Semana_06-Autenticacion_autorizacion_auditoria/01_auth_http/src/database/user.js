//Uso dotenv para levantar el archivo de configuración .env
import conexion from './conexion.js';

class User {

    find = async (username, password) => {
        // Defino el string de consulta
        const strSql = `SELECT user_id AS userId, first_name AS firstName, last_name AS lastName 
                    FROM users u
                    WHERE u.username = ? AND u.pass = SHA2(?, 256) AND activo = 1`;

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [username, password]);

        return rows[0];
    };

    findById = async (userId) => {
        // Defino el string de consulta
        const strSql = `SELECT user_id AS userId, username, first_name AS firstName, last_name AS lastName 
                    FROM users 
                    WHERE user_id = ? AND activo = 1`;

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [userId]);

        return rows[0];
    };

}

export default User;