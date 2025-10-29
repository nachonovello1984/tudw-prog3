import express from 'express';
import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Crear cliente Redis
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

// Manejar errores de conexión
redisClient.on('error', (err) => {
  console.error('Error de conexión a Redis:', err);
});

redisClient.on('connect', () => {
  console.log('Conectado a Redis!');
});

// Conectar a Redis
redisClient.connect();

// Endpoint PUT para insertar elementos
app.put('/redis/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ 
        error: 'El campo "value" es requerido en el body' 
      });
    }

    const valueToStore = typeof value === 'object' 
      ? JSON.stringify(value) 
      : String(value);

    await redisClient.set(key, valueToStore);

    res.status(200).json({ 
      message: 'Elemento insertado correctamente',
      key: key,
      value: value
    });
  } catch (error) {
    console.error('Error al insertar en Redis:', error);
    res.status(500).json({ 
      error: 'Error al insertar el elemento',
      details: error.message 
    });
  }
});

// Endpoint GET para obtener un elemento
app.get('/redis/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const value = await redisClient.get(key);

    if (value === null) {
      return res.status(404).json({ 
        error: 'Clave no encontrada' 
      });
    }

    let parsedValue;
    try {
      parsedValue = JSON.parse(value);
    } catch {
      parsedValue = value;
    }

    res.status(200).json({ 
      key: key,
      value: parsedValue
    });
  } catch (error) {
    console.error('Error al obtener de Redis:', error);
    res.status(500).json({ 
      error: 'Error al obtener el elemento',
      details: error.message 
    });
  }
});

// Endpoint GET listar todas las entradas
app.get('/redis-all', async (req, res) => {
  try {
    const keys = await redisClient.keys('*');
    const values = await Promise.all(keys.map(key => redisClient.get(key)));
    const result = keys.map((key, index) => ({ key, value: values[index] }));
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al listar claves:', error);
    res.status(500).json({ 
      error: 'Error al listar las claves',
      details: error.message 
    });
  }
});

// Endpoint DELETE para eliminar un elemento
app.delete('/redis/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const result = await redisClient.del(key);

    if (result === 0) {
      return res.status(404).json({ 
        error: 'Clave no encontrada' 
      });
    }

    res.status(200).json({ 
      message: 'Elemento eliminado correctamente',
      key: key
    });
  } catch (error) {
    console.error('Error al eliminar de Redis:', error);
    res.status(500).json({ 
      error: 'Error al eliminar el elemento',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await redisClient.quit();
  console.log('Conexión a Redis cerrada');
  process.exit(0);
});
