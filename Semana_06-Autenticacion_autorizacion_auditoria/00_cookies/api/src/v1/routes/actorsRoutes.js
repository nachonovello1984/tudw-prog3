const express = require("express");
const actorsController = require("../../controllers/actorsController");

const router = express.Router();
//Elegidos
router.get("/actors/chosen", actorsController.chosen);

router.get("/actors", actorsController.findAll);

router.get("/actors/:actorId", actorsController.findById);

router.post("/actors", actorsController.create);

router.put("/actors/:actorId", actorsController.update);

router.delete("/actors/:actorId", actorsController.destroy);

//Elegir
router.put("/actors/:actorId/choose", actorsController.choose);



module.exports = router;