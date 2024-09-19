import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import validateContentType from "./middlewares/validateContentType.js";
import { router as v1Router } from "./v1/routes/actorsRoutes.js";
import { router as v2Router } from "./v2/routes/actorsRoutes.js";

const app = express();

app.use(validateContentType);
app.use(express.json());
app.use(cors());
app.use(helmet());


// CORS opción dominios permitidos
// const corsOptions = {
//     origin: 'https://fcad.uner.edu.ar', // Dominio permitido
//     optionsSuccessStatus: 200, 
// };

// app.use(cors(corsOptions));


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CRUD Mejores Prácticas - Sakila Actors',
            version: '1.0.0',
            description: 'CRUD Mejores Prácticas - Sakila Actors',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/v2/routes/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api/", v2Router);
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

// swagger-ui-express sirve la interfaz Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))