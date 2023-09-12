//Uso dotenv para levantar el archivo de configuración .env
require('dotenv').config();

//Uso mysql2 para conectarme a MySQL
const mysql = require('mysql2');

// Creo el pool de conexión
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Defino el string de consulta
const sqlQuery = 'SELECT * FROM actor';

// Ejecuto la consulta
pool.query(sqlQuery, (queryErr, results) => {
  if (queryErr) {
    console.error('Error ejecutando la consulta:', queryErr);
    return;
  }

  // Muestro los resultados con un console.log
  console.log('Resultados:', results);

});