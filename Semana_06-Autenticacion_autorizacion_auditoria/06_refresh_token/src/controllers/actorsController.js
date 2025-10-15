import ActorsService from "../services/actorsService.js";

class ActorsController {

    constructor() {
        this.service = new ActorsService();
    }


    findAll = async (req, res) => {

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

            const data = await this.service.findAll({ firstName, lastName }, pLimit, pOffset, pOrder, pAsc);

            res.send(data);

        } catch (exc) {
            throw exc;
        }
    };

    findById = async (req, res) => {

        const actorId = req.params.actorId;

        if (!actorId) {
            res.status(404).send({ status: "Fallo", data: { error: "El parámetro actorId no puede ser vacío." } })
        }

        const data = await this.service.findById(actorId);

        res.send(data);
    };

    create = async (req, res) => {
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
            const actorCreado = await this.service.create(actor);
            res.status(201).send(actorCreado);
        } catch (error) {
            res
                .status(error?.status || 500)
                .send({ status: "FAILED", data: { error: error?.message || error } });
        }
    };

    update = async (req, res) => {
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
            const actorActualizado = await this.service.update(actorId, body);
            res.send(actorActualizado);
        } catch (error) {
            res.status(error?.status || 500).send({ status: "Fallo", data: { error: error?.message || error } });
        }
    };

    destroy = async (req, res) => {

        const actorId = req.params.actorId

        if (!actorId) {
            res.status(404).send({ status: "Fallo", data: { error: "El parámetro actorId no puede ser vacío." } })
        }

        try {
            await this.service.destroy(actorId);
            res.status(204).send();
        } catch (error) {
            res.status(error?.status || 500).send({ status: "Fallo", data: { error: error?.message || error } });
        }
    };

}

export default ActorsController;