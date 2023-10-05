const service = require("../services/rentalsService");

const findById = async (req, res) => {

    const rentalId = req.params.rentalId;

    if (!rentalId) {
        res.status(404).send({ status: "Fallo", data: { error: "El parámetro rentalId no puede ser vacío." } });
    }

    const data = await service.findById(rentalId);

    res.send({ status: "OK", data });
};

const create = async (req, res) => {
    const { body } = req;

    if (!body.customerId || !body.filmId || !body.storeId || !body.staffId) {
        res
            .status(404)
            .send({
                status: "Fallo",
                data: {
                    error: "Uno de los siguientes datos falta o es vacío: 'customerId', 'filmId', 'storeId', 'staffId'."
                }
            });
    }

    const rental = {
        customerId: body.customerId,
        filmId: body.filmId,
        storeId: body.storeId,
        staffId: body.staffId
    };

    try {
        const rentalCreado = await service.create(rental);
        res.status(201).send({ status: "OK", data: rentalCreado });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { findById, create };