import dotenv from "dotenv";
dotenv.config();
//Uso mysql2/promise para conectarme a MySQL usando promises
import mysql from "mysql2/promise";

export default class BdUtils {
    static async initConnection() {
        const conexion = await mysql.createConnection({
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                    });

        return conexion;
    }
};