const service = require("../services/filmsService");

const findAll = async (req, res) => {

    try {

        const data = await service.findAll();

        res.render("films", { title: "Films", data: 0 });

    } catch (exc) {
        throw exc;
    }
};

const click = async (req, res) => {
    const cantidad = req.session?.click;
    if (cantidad) {
        req.session.click = cantidad + 1;
    } else {
        req.session.click = 1;
    }
    res.render("films", { title: "Films", data: req.session.click });
}

module.exports = { findAll, click };