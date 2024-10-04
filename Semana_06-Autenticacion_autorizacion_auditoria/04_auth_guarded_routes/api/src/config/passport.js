import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import UsersService from "./../services/usersService.js";
import dotenv from "dotenv";

dotenv.config();

//Defino como se validan los usuarios
const estrategia = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async (username, password, done) => {
        try {
            const service = new UsersService();
            const user = await service.find(username, password);
            if (!user) {
                return done(null, false, { message: 'Nombre de usuario y/o contraseña incorrectos.' });
            } else {
                return done(null, user, { message: 'Login correcto!' });
            }
        } catch (exc) {
            done(exc);
        }
    }
);

//Defino como se validan los tokens
const validacion = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    async (jwtPayload, done) => {
        const service = new UsersService();
        const user = await service.findById(jwtPayload.userId);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Token incorrecto.' });
        }
    }
);

export { estrategia, validacion };