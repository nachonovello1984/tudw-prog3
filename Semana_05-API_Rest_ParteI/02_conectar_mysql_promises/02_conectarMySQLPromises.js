//Uso dotenv para levantar el archivo de configuración .env
require('dotenv').config();

//Uso mysql2/promise para conectarme a MySQL usando promises
const mysql = require('mysql2/promise');

// Creo el pool de conexión
const pool = mysql.createPool({
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
    const [rows] = await pool.query(sqlQuery);

    console.log('Query results:', rows);

  } catch (err) {
    console.error('Error executing SELECT query:', err);
  }
}

getAllActors();