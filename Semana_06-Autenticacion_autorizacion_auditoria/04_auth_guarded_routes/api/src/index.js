const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const passport = require("passport");
const morgan = require('morgan');

require("./config/passport");

const { isAdmin } = require('./middlewares/isAdmin');
const v1AuthRouter = require("./v1/routes/authRoutes.js");
const v1ActorsRouter = require("./v1/routes/actorsRoutes.js");
const v1FilmsRouter = require("./v1/routes/filmsRoutes.js");

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", v1AuthRouter);
app.use("/api/v1", passport.authenticate('jwt', {session: false}), v1ActorsRouter);
app.use("/api/v1", [passport.authenticate('jwt', {session: false}), isAdmin], v1FilmsRouter);

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))