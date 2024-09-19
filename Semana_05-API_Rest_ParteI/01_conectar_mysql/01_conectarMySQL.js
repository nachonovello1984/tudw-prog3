//Uso dotenv para levantar el archivo de configuración .env
import dotenv from 'dotenv'
//Uso mysql2 para conectarme a MySQL
import mysql from 'mysql2';
dotenv.config();

// Creo la conexión
const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Defino el string de consulta
const sqlQuery = 'SELECT * FROM actor';

// Ejecuto la consulta
conexion.query(sqlQuery, (queryErr, results) => {
  if (queryErr) {
    console.error('Error ejecutando la consulta:', queryErr);
    return;
  }

  // Muestro los resultados con un console.log
  console.log('Resultados:', results);

});