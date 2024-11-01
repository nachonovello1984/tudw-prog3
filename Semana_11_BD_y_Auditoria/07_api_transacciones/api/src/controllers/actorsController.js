const service = require("../services/actorsService");

const findAll = async (req, res) => {

    //Filtros
    const firstName = req.query.firstName; 
    const lastName = req.query.lastName;

    //Paginación
    const limit = req.query.limit;
    const offset = req.query.offset;
    const order = req.query.order;
    const asc = req.query.asc;

    try {

        //Si no están definidos limit y offset no hago paginación
        let pLimit = limit ? Number(limit) : 0;
        let pOffset = offset ? Number(offset) : 0;
        let pOrder = order || "actorId";
        let pAsc = asc === "false" ? false : true;

        const data = await service.findAll({ firstName, lastName }, pLimit, pOffset, pOrder, pAsc);

        res.send({ status: "OK", data });

    } catch (exc) {
        throw exc;
    }
};

const findById = async (req, res) => {

    const actorId = req.params.actorId;

    if (!actorId) {
        res.status(404).send({ status: "Fallo", data: { error: "El parámetro actorId no puede ser vacío." } });
    }

    const data = await service.findById(actorId);

    res.send({ status: "OK", data });
};

const create = async (req, res) => {
    const { body } = req;

    if (!body.firstName || !body.lastName) {
        res
            .status(404)
            .send({
                status: "Fallo",
                data: {
                    error: "Uno de los siguientes datos falta o es vacío: 'firstName', 'lastName'."
                }
            });
    }

    const actor = {
        firstName: body.firstName,
        lastName: body.lastName
    };

    try {
        const actorCreado = await service.create(actor);
        res.status(201).send({ status: "OK", data: actorCreado });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const update = async (req, res) => {
    const body = req.body;
    const actorId = req.params.actorId

    if (!actorId) {
        res
            .status(404)
            .send({
                status: "Fallo",
                data: {
                    error: "El parámetro actorId no puede ser vacío."
                }
            });
    }

    try {
        const actorActualizado = await service.update(actorId, body);
        res.send({ status: "OK", data: actorActualizado });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "Fallo", data: { error: error?.message || error } });
    }
};

const destroy = async (req, res) => {

    const actorId = req.params.actorId

    if (!actorId) {
        res.status(404).send({ status: "Fallo", data: { error: "El parámetro actorId no puede ser vacío." } })
    }

    try {
        await service.destroy(actorId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "Fallo", data: { error: error?.message || error } });
    }
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    destroy,
};