const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = 3000;

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    helpers: {
        eq: function (str1, str2, options) {
            return str1 === str2 ? options : '';
        }
    }
});

// Configuro Handlebars como motor de vistas
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configuro que los recursos estáticos van a estar en la carpeta public
app.use(express.static(__dirname + '/public'));

// Rutas
app.get('/', (req, res) => res.render('inicio', { title: 'Inicio' }));

app.get('/institucional', (req, res) => 
    res.render('institucional', { title: 'Institucional' }));

app.get('/contacto', (req, res) => {
    res.render('contacto', { title: 'Contacto' })
});

// Página personalizada de error 404
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// Página personalizada de error 500
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
})

app.listen(port, () => console.log(`Express iniciado en http://localhost:${port}`));