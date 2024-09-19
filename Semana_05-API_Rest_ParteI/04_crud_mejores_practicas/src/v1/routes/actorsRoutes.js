import express from "express";
import ActorsController from "../../controllers/actorsController.js";

const actorsController = new ActorsController();

const router = express.Router();

router.get("/actors", actorsController.findAll);

router.get("/actors/:actorId", actorsController.findById);

router.post("/actors", actorsController.create);

router.put("/actors/:actorId", actorsController.update);

router.delete("/actors/:actorId", actorsController.destroy);

export { router };