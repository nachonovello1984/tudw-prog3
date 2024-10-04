import dotenv from "dotenv";
//Paquetes para hacer applicación express con handlebars
import express from "express";
import expressHandlebars from 'express-handlebars';

import { fileURLToPath } from 'url';
import path from 'path';

//Paquetes para tratar con sesiones.
import passport from "passport";
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';

//Rutas
import actorsRouter from './v1/routes/actorsRoutes.js';
import filmsRouter from './v1/routes/filmsRoutes.js';
import dashboardRouter from './v1/routes/dashboardRoutes.js';

import UsersService from "./services/usersService.js";

dotenv.config();
const service = new UsersService();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

//Helpers de handlebars
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    helpers: {
        eq: function (str1, str2, options) {
            return str1 === str2 ? options : '';
        }
    }
});

// Configuro Handlebars como motor de vistas
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Configuro que los recursos estáticos van a estar en la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//***********
// CONFIGURACIÓN SESIONES
//***********
app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: "true" } // Para usar en producción
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    (username, password, cb) => {
        service.find(username, password).then(data => {
            if (!data) {
                cb(null, false, { message: 'Nombre de usuario y/o contraseña incorrectos.' });
            }

            cb(null, data, { message: 'Login correcto!' });

        }).catch(err => {
            console.log(err);
            cb(err);
        });
    }
));

passport.serializeUser((user, cb) => {
    console.log(`serializeUser: ${user.userId}`);
    cb(null, user.userId);
});

passport.deserializeUser((userId, cb) => {
    console.log("deserializeUser");
    service.findById(userId)
        .then(user => {
            if (!user) {
                cb(new Error("Credenciales inválidas"));
            }

            cb(null, user);
        })
        .catch((err) => cb(err));
});

//***********
// FIN CONFIGURACIÓN SESIONES
//***********

// Rutas
app.get('/', (_, res) => res.render('inicio', { title: 'Inicio' }));

app.get('/institucional', (_, res) => res.render('institucional', { title: 'Institucional' }));

app.get('/contacto', (_, res) => { res.render('contacto', { title: 'Contacto' }) });

//app.route('/restricted/', isAuthenticated, dashboardRouter);
app.use('/restricted/', dashboardRouter);
app.use('/restricted/', actorsRouter);
app.use('/restricted/', filmsRouter);

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {

        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                err: info
            });
        }

        req.logIn(user, function (err) {

            if (err) {
                return res.status(500).json({
                    err: 'No se pudo hacer el login de usuario.'
                });
            }

            res.redirect('/restricted/dashboard');

        });
    })(req, res, next);
});

app.get('/login', (_, res) => {
    res.render('login', { title: 'Login' })
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});

// Página personalizada de error 404
app.use((req, res) => {
    console.log(req.url);
    res.status(404);
    res.render('404');
});

// Página personalizada de error 500
app.use((err, _, res) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
});

app.listen(port, () => console.log(`Express iniciado en http://localhost:${port}`));