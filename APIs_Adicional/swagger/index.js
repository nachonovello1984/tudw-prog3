const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(express.json());

/**
 * @swagger
 * /profes/:
 *   get:
 *     summary: Este endpoint retorna el nombre de los profes de prog. III
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Resource not found
 */
app.get("/profes/", (req, res) => {
    res.send(
        [{ "nombre": "Ignacio", "apellido": "Novello" }, 
        { "nombre": "Cristian", "apellido": "Faure" }]
    );
});

/**
 * @swagger
 * /test2/:
 *   get:
 *     summary: Este endpoint retorna el nombre de los profes de prog. III
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Resource not found
 */
app.get("/test2/", (req, res) => {
    res.send(
        [{ "nombre": "Ignacio", "apellido": "Novello" }, 
        { "nombre": "Cristian", "apellido": "Faure" }]
    );
});

/**
 * @swagger
 * /test3/:
 *   get:
 *     summary: Este endpoint retorna el nombre de los profes de prog. III
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: int
 *         description: para obtener el profe por id
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Resource not found
 */
app.get("/test3", (req, res) => {
    res.send(
        [{ "nombre": "Ignacio", "apellido": "Novello" }, 
        { "nombre": "Cristian", "apellido": "Faure" }]
    );
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000")
});
