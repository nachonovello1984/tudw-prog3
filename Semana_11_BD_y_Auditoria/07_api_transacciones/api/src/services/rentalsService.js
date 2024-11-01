const Rental = require("../database/rental");

const findById = (rentalId) => {
    return Rental.findById(rentalId);
};

const create = (rental) => {
    return Rental.create(rental);
};

module.exports = { findById, create };