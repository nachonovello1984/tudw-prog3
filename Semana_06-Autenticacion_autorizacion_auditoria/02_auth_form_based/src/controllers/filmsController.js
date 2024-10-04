
import FilmsService from "../services/filmsService.js";

class FilmsController {
    constructor() {
        this.service = new FilmsService();
    }

    findAll = async (req, res) => {

        try {

            const data = await this.service.findAll();

            res.render("films", { title: "Films", data: 0 });

        } catch (exc) {
            throw exc;
        }
    };

    click = async (req, res) => {
        const cantidad = req.session?.click;
        if (cantidad) {
            req.session.click = cantidad + 1;
        } else {
            req.session.click = 1;
        }
        res.render("films", { title: "Films", data: req.session.click });
    }

}

export default FilmsController;