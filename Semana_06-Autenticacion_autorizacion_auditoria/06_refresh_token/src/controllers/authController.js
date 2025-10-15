import jwt from 'jsonwebtoken';
import passport from "passport";
import dotenv from 'dotenv'
dotenv.config();
import UsersService from '../services/usersService.js';

class AuthController {

    login = async (req, res) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Solicitud incorrecta',
                    user
                });
            }

            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }
                // generate a signed json web token with the contents of user object and return it in the response
                const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '10s' });
                const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: '1m' });
                return res.json({ accessToken, refreshToken });
            });
        })(req, res);
    };

    refresh = async (req, res) => {
        const { refreshToken : refreshTokenFromBody } = req.body;
        if (!refreshTokenFromBody) {
            return res.status(400).json({ message: 'No se proporciono un refresh token' });
        }
        try {
            const decoded = jwt.verify(refreshTokenFromBody, process.env.JWT_REFRESH_SECRET);
            const usersService = new UsersService();
            const user = await usersService.findById(decoded.userId);
            if (!user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }
            const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '10s' });
            const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: '1m' });
            return res.json({ accessToken, refreshToken });
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: 'Refresh Token inválido' });
        }
    };


    

}

export default AuthController;