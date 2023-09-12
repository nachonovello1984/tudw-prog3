const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const v1Router = require("./v1/routes/actorsRoutes.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// CORS opción dominios permitidos
// const corsOptions = {
//     origin: 'https://fcad.uner.edu.ar', // Dominio permitido
//     optionsSuccessStatus: 200, 
// };

// app.use(cors(corsOptions));

app.use("/api/v1", v1Router);

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))