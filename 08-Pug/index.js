const express = require('express');
const app = express();
const path = require('path');

// Configuro pug como motor de vistas
app.set('view engine', 'pug');

// Configuro el directorio donde voy a dejar las vistas
app.set('views', path.join(__dirname, 'views'));

// Configuro el directorio donde van a alojarse los recursos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render the Pug template
app.get('/', (req, res) => {
  const fechaHora = new Date();

  res.render('index', {fechaHora: fechaHora.toLocaleString()});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express iniciado en http://localhost:${port}`));