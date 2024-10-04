import express from "express";
import FilmsController from "../../controllers/filmsController.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

const router = express.Router();
const filmsController = new FilmsController();

router.get("/films", isAuthenticated, filmsController.findAll);
router.get("/films/click", isAuthenticated, filmsController.click);

export default router;