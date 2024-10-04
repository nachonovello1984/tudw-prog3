import express from "express";
import cors from "cors";
import { router as v1RouterActors } from "./v1/routes/actorsRoutes.js";
import { router as v1RouterFilms } from "./v1/routes/filmsRoutes.js";
import httpAuthMiddleware from './middlewares/httpAuthMiddleware.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", v1RouterActors);
app.use("/api/v1", httpAuthMiddleware, v1RouterFilms);

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))