//Uso dotenv para levantar el archivo de configuración .env
require('dotenv').config();

//Aislo en otro archivo la consulta a la base de datos
const actors = require('./actors');

const express = require("express");

const app = express();
app.use(express.json());

app.get('/actors', async (req, res) => {
    const results = await actors.findAll();

    res.json(results);
});

app.get('/actors/:id', async (req, res) => {
    const id = req.params.id;
    const results = await actors.findById(id);

    res.json(results);
});

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))