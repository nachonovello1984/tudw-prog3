const express = require("express");
const filmsController = require("../../controllers/filmsController");
const { isAuthenticated } = require("../../middlewares/isAuthenticated");

const router = express.Router();

router.get("/films", isAuthenticated, filmsController.findAll);
router.get("/films/click", isAuthenticated, filmsController.click);

module.exports = router;