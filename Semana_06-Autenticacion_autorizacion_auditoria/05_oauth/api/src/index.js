import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { estrategia } from "./config/passport.js";
import v1ActorsRouter from "./v1/routes/actorsRoutes.js";
import v1FilmsRouter from "./v1/routes/filmsRoutes.js";
import jwtAuthMiddleware from './middlewares/jwtAuthMiddleware.js';

dotenv.config();
const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

// Inicialización de Passport
app.use(passport.initialize());

// Configuración de Passport con Google Strategy
passport.use(estrategia);

// Serializar y deserializar el usuario para la sesión
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Ruta para iniciar la autenticación con Google
app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email'],})
);

// Ruta de callback de Google
app.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }), // No se usa sesión
    (req, res) => {
        // Generar JWT con los datos del usuario
        const user = {
            id: req.user.id,
            displayName: req.user.displayName,
            email: req.user.emails[0].value,
        };

        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '1h', // El token expira en 1 hora
        });

        // Redirigir al frontend pasando el token como query param o cookie (ejemplo con query param)
        res.redirect(`http://localhost:3000?token=${token}`);
    }
);

app.use("/api/v1", v1ActorsRouter);
app.use("/api/v1", jwtAuthMiddleware, v1FilmsRouter);

// Ruta para cerrar sesión
app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
