import express from "express";
import apicache from "apicache";
import ActorsController from "../../controllers/actorsController.js";

let cache = apicache.middleware;

const actorsController = new ActorsController();
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Actor:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *       properties:
 *         actorId:
 *           type: integer
 *           description: ID del actor/actriz
 *         firstName:
 *           type: string
 *           description: Nombre del actor/actriz
 *         lastName:
 *           type: string
 *           description: apellido del actor/actriz
 *         lastUpdate:
 *           type: string
 *           format: date-time
 *           description: última modificación del actor/actriz. 
 * 
 *       example:
 *         actorId: 1
 *         firstName: PENELOPE
 *         lastName: GUINESS
 *         lastUpdate: 2024-09-12 18:05:18
 */

/**
 * @swagger
 * /api/actors:
 *   get:
 *     summary: Obtiene una lista de todos los actores/actrices
 *     tags: [Actors]
 *     responses:
 *       200:
 *         description: Lista de actores/actrices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *             examples:
 *               ejemplo1:
 *                 summary: Ejemplo de respuesta exitosa
 *                 value:
 *                   - actorId: 1
 *                     firstName: PENELOPE
 *                     lastName: GUINESS
 *                     lastUpdate: 2024-09-12 18:05:18
 *                   - actorId: 2
 *                     firstName: NICK
 *                     lastName: CAGE
 *                     lastUpdate: 2023-10-12 18:36:36
 */
router.get("/actors", cache("5 minutes"), actorsController.findAll);

/**
 * @swagger
 * /api/actors/{actorId}:
 *   get:
 *     summary: Obtener información de un actor/actriz
 *     tags: [Actors]
 *     description: Devuelve los detalles de un actor/actriz por su ID.
 *     parameters:
 *       - name: actorId
 *         in: path
 *         required: true
 *         description: El ID del actor/actriz que se desea obtener.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Actor/actriz encontrado/a.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 actorId:
 *                   type: integer
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: "NICK"
 *                 lastName:
 *                   type: string
 *                   example: "CAGE"
 *                 lastUpdate:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-09-19T14:38:00Z"
 *       '404':
 *         description: Actor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Actor no encontrado"
 */
router.get("/actors/:actorId", actorsController.findById);

router.post("/actors", actorsController.create);

router.put("/actors/:actorId", actorsController.update);

router.delete("/actors/:actorId", actorsController.destroy);

export { router };