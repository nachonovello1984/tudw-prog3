import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as v1RouterActors } from "./v1/routes/actorsRoutes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000', // Dominio permitido
    credentials: true
};

app.use(cors(corsOptions));

app.use("/api/v1", v1RouterActors);

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))