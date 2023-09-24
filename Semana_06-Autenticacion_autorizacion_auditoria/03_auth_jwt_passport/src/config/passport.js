const passport = require('passport');
const passportJWT = require("passport-jwt");
const service = require('./../services/usersService');
require('dotenv').config();

const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

//Defino como se validan los usuarios
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async (username, password, cb) => {
        try {
            const user = await service.find(username, password);
            if (!user) {
                return cb(null, false, { message: 'Nombre de usuario y/o contraseña incorrectos.' });
            } else {
                return cb(null, user, { message: 'Login correcto!' });
            }
        } catch (exc) {
            cb(exc);
        }
    }
));

//Defino como se validan los tokens
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    async (jwtPayload, cb) => {
        const user = await service.findById(jwtPayload.userId);
        if (user) {
            return cb(null, user);
        } else {
            return cb(null, false, { message: 'Token incorrecto.' });
        }
    }
));