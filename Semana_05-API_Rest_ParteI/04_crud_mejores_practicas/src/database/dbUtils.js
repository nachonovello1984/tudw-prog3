import dotenv from "dotenv";
dotenv.config();

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