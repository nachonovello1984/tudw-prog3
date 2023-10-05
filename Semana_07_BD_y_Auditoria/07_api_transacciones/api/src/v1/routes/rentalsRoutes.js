const express = require("express");
const rentalsController = require("../../controllers/rentalsController");

const router = express.Router();

router.get("/rentals/:rentalId", rentalsController.findById);

router.post("/rentals", rentalsController.create);

module.exports = router;