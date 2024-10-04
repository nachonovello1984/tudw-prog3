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

            res.render("actors", {title: "Actors", data});

        } catch (exc) {
            throw exc;
        }
    };

}

export default ActorsController;