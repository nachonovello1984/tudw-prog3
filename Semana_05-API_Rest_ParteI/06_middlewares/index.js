import dotenv from 'dotenv';
import express from "express";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  console.log(`Petición: ${req.method} ${req.url}`);
  next(); // sin esto, la petición no avanza
});

// Ruta
app.get('/', (_, res) => {
  res.send('Hola mundo');
});

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))