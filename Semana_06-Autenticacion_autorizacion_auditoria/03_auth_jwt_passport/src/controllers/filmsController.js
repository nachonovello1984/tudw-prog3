
import FilmsService from "../services/filmsService.js";

class FilmsController {
    constructor() {
        this.service = new FilmsService();
    }

    findAll = async (req, res) => {

        //Así conozco el usuario que inició sesión
        //console.log(req.headers.authorization);
        console.log(req.user);

        try {

            const data = await this.service.findAll();

            res.send({ status: "OK", data });

        } catch (exc) {
            throw exc;
        }
    };

}

export default FilmsController;