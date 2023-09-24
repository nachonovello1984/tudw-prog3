const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const v1RouterActors = require("./v1/routes/actorsRoutes.js");

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000', // Dominio permitido
    credentials: true 
};

app.use(cors(corsOptions));

app.use("/api/v1", v1RouterActors);

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))