const Film = require("../database/film");
const findAll = () => {
    return Film.findAll();
};

module.exports = { findAll };