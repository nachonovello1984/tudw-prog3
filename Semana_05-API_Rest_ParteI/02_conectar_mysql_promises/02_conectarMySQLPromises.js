//Uso dotenv para levantar el archivo de configuración .env
import dotenv from 'dotenv';
//Uso mysql2/promise para conectarme a MySQL usando promises
import mysql from 'mysql2/promise';
dotenv.config();

// Creo la conexión
const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function getAllActors() {
  try {

    // Defino el string de consulta
    const sqlQuery = 'SELECT * FROM actor';

    // Ejecuto la consulta
    const [rows] = await conexion.query(sqlQuery);

    console.log('Query results:', rows);

  } catch (err) {
    console.error('Error executing SELECT query:', err);
  }
}

getAllActors();