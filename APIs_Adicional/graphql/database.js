import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'nacho',
  password: process.env.DB_PASSWORD || 'abc.1234',
  database: process.env.DB_NAME || 'sakila',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Conectado a la base de datos MySQL (Sakila)');
    connection.release();
    return true;
  } catch (error) {
    console.error('✗ Error al conectar a la base de datos:', error.message);
    return false;
  }
}

export { pool, testConnection };
