import jwt from 'jsonwebtoken';
import passport from "passport";
import dotenv from 'dotenv'
dotenv.config();

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
                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ token });
            });
        })(req, res);
    };

}

export default AuthController;