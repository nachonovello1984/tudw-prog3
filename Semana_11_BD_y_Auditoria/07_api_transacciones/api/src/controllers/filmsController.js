const service = require("../services/filmsService");

const findAll = async (req, res) => {

    try {

        const data = await service.findAll();

        res.send({ status: "OK", data });

    } catch (exc) {
        throw exc;
    }
};

module.exports = {
    findAll
};