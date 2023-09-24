const express = require("express");
const actorsController = require("../../controllers/actorsController");
const { isAuthenticated } = require("../../middlewares/isAuthenticated");

const router = express.Router();

router.get("/actors", isAuthenticated, actorsController.findAll);

module.exports = router;