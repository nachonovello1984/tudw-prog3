//Uso dotenv para levantar el archivo de configuración .env
import dotenv from 'dotenv'
import conexion from './conexion.js'
dotenv.config();

class TreeDB {

    findAll = async () => {

        // Defino el string de consulta
        let strSql = `  SELECT * FROM menu 
                        WHERE idPadre IS NULL 
                        ORDER BY orden`

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql);
        for(const item of rows) {
            const hijos = await this.findByIdPadre(item.id);
            item.hijos = hijos;
        }

        return rows;
    };

    findByIdPadre = async (idPadre) => {
        // Defino el string de consulta
        const strSql = `SELECT * 
                        FROM menu 
                        WHERE idPadre = ? 
                        ORDER BY orden`;

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [idPadre]);

        return rows;
    };

}

export default TreeDB;


