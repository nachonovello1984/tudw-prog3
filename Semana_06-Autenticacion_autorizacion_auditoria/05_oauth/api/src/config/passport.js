import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";

dotenv.config();

//Defino como se validan los usuarios
const estrategia = new GoogleStrategy(
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
);

export { estrategia};