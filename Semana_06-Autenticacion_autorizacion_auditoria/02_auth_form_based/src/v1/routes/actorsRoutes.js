import express from "express";
import ActorsController from "../../controllers/actorsController.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

const actorsController = new ActorsController();

const router = express.Router();

router.get("/actors", isAuthenticated, actorsController.findAll);

export default router;