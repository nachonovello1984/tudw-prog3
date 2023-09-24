const express = require("express");
const filmsController = require("../../controllers/filmsController");

const router = express.Router();

router.get("/films", filmsController.findAll);

module.exports = router;