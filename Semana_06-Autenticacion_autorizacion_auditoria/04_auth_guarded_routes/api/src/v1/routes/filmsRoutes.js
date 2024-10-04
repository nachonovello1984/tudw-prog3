import express from "express";
import FilmsController from "../../controllers/filmsController.js";

const router = express.Router();
const filmsController = new FilmsController();

router.get("/films", filmsController.findAll);

export default router;