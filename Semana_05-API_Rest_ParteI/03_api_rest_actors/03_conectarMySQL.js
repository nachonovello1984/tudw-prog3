//Uso dotenv para levantar el archivo de configuración .env
import dotenv from 'dotenv';
//Aislo en otro archivo la consulta a la base de datos
import { findAll, findById } from './actors';
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());

app.get('/actors', async (_, res) => {
    const results = await findAll();

    res.json(results);
});

app.get('/actors/:id', async (req, res) => {
    const id = req.params.id;
    const results = await findById(id);

    res.json(results);
});

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))