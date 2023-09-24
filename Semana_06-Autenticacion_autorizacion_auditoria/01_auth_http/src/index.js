const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const v1RouterActors = require("./v1/routes/actorsRoutes.js");
const v1RouterFilms = require("./v1/routes/filmsRoutes.js");

const httpAuthMiddleware = require('./middlewares/httpAuthMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", v1RouterActors);
app.use("/api/v1", httpAuthMiddleware.httpAuthMiddleware, v1RouterFilms);

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))