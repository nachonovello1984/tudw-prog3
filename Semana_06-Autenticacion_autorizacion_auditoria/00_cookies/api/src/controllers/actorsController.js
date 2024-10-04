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

            res.send({ status: "OK", data });

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

        res.send({ status: "OK", data });
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
            res.status(201).send({ status: "OK", data: actorCreado });
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
            res.send({ status: "OK", data: actorActualizado });
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
            res.status(204).send({ status: "OK" });
        } catch (error) {
            res.status(error?.status || 500).send({ status: "Fallo", data: { error: error?.message || error } });
        }
    };

    choose = async (req, res) => {
        const actorId = req.params.actorId;
        if (!actorId) {
            res.status(400).send({ status: "Fallo", data: { error: "No se indicó el actor a seleccionar." } });
            console.log("llega");
        }

        //Si la cookie fue enviada previamente concateno los valores separados por -
        let actorsCookie = req.cookies?.actorsCookie;
        actorsCookie = (actorsCookie) ? actorsCookie + "-" : "";

        const cookieValue = actorsCookie + actorId;

        res.cookie('actorsCookie', cookieValue, {
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours (in milliseconds)
            //httpOnly: true, // Cookie can only be accessed via HTTP(S), not JavaScript
            //secure: true, // Cookie should only be sent over HTTPS (in a secure connection)
            sameSite: 'strict', // Restricts how the cookie is sent in cross-site requests
        }).send({ status: "OK", data: { actorId } });
    }

    chosen = async (req, res) => {
        const actorsCookie = req.cookies?.actorsCookie;

        if (!actorsCookie) {
            res.status(400).send({ status: "Fallo", data: { error: "Cookie no enviada" } });
            return;
        }

        let data = [];
        for (const id of actorsCookie.split("-")) {
            data = data.concat(await this.service.findById(id));
        }

        res.send({ status: "OK", data });
    };
};

export default ActorsController;