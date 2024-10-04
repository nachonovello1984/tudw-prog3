import FilmsService from "../services/filmsService.js";

class FilmsController {

    constructor() {
        this.service = new FilmsService();
    }

    findAll = async (req, res) => {

        try {

            const data = await this.service.findAll();

            res.send(data);

        } catch (exc) {
            throw exc;
        }
    };

}

export default FilmsController;