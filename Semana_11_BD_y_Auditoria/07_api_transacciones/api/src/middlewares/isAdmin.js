const jwt = require('jsonwebtoken');
const service = require("../services/usersService");
require('dotenv').config();

const isAdmin = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El token es enviado utilizando "Bearer"

    if (!token) {
        return res.sendStatus(401); // No autorizado
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res  .status(403)
                        .send({ status: "Fallo", data: { error: "Token inválido." } }); // Token inválido
        }

        const data = await service.findById(user.userId);
        if (data.rol != "admin") {
            return res.status(403)
                      .send({ status: "Fallo", data: { error: "No tiene los privilegios necesarios." } });
        }

        next();
    });
};

module.exports = { isAdmin };