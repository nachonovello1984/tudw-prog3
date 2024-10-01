const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

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
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            scope: ['profile', 'email'],
        },
        (accessToken, refreshToken, profile, done) => {
            // Aquí puedes manejar el perfil del usuario y guardarlo en la base de datos si es necesario
            done(null, profile);
        }
    )
);

// Serializar y deserializar el usuario para la sesión
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Ruta para iniciar la autenticación con Google
app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
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

// Middleware para proteger rutas
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Ruta protegida
app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Esta es una ruta protegida', user: req.user });
});

// Ruta para cerrar sesión
app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Ruta protegida
app.get('/api/current_user', authenticateJWT, (req, res) => {
    res.send(req.user);
});

app.listen(3001, () => {
    console.log('Servidor escuchando en http://localhost:3001');
});
