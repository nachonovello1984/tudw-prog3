import express from "express";
import cors from "cors";
import passport from "passport";
import morgan from 'morgan';

import { estrategia, validacion } from "./config/passport.js";

import v1AuthRouter from "./v1/routes/authRoutes.js";
import v1ActorsRouter from "./v1/routes/actorsRoutes.js";
import v1FilmsRouter from "./v1/routes/filmsRoutes.js";

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(cors());

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

app.use("/api/v1", v1AuthRouter);
app.use("/api/v1", v1ActorsRouter);
app.use("/api/v1", passport.authenticate('jwt', { session: false }), v1FilmsRouter);

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))