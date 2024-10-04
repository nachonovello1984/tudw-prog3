import express from "express";
import ActorsController from "../../controllers/actorsController.js";

const router = express.Router();
const actorsController = new ActorsController();

router.get("/actors", actorsController.findAll);

router.get("/actors/:actorId", actorsController.findById);

router.post("/actors", actorsController.create);

router.put("/actors/:actorId", actorsController.update);

router.delete("/actors/:actorId", actorsController.destroy);

export default router;