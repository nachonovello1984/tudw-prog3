import express from 'express';
import expressHandlebars from 'express-handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

//Rutas
app.get('/', (req, res) => res.render('inicio', { title: 'Inicio' }));

app.get('/institucional', (req, res) => res.render('institucional', { title: 'Institucional' }));

app.post('/automoviles/nuevo', (req, res) => {
    let payload = '';

    req.on('data', chunk => {
        payload += chunk.toString();
    });

    req.on('end', () => {
        console.log(payload); // Esto muestra en la consola los datos enviados.
        res.render('automovilesNuevo', { title: 'Nuevo Automóvil', datosEnviados: payload });
    });
});

app.get('/automoviles/nuevo', (req, res) => {
    res.render('automovilesNuevo', { title: 'Nuevo Automóvil' });
});

app.get('/automoviles', (req, res) => {
    const orden = req.query.orden;
    let asc = req.query.asc;
    
    fs.readFile('./data/automoviles.json', (err, data) => {
        if (err) {
            console.log(err);
            throw new Exception(err);
        }

        let automoviles = JSON.parse(data);

        if (orden) {
            automoviles = automoviles.sort((a, b) => {
                if (orden === 'marca') {
                    return a.marca.localeCompare(b.marca);
                }

                if (orden === 'modelo') {
                    return a.modelo.localeCompare(b.modelo);
                }

                if (orden === 'anio') {
                    return a.anio - b.anio;
                }

                if (orden === 'tipo') {
                    return a.tipo.localeCompare(b.tipo);
                }

                if (orden === 'color') {
                    return a.color.localeCompare(b.color);
                }
            });
        }

        asc = Boolean(asc === "true");
        if (!asc) {
            automoviles = automoviles.reverse();
        }
        asc = !asc;

        res.render('automoviles', { title: 'Automóviles', automoviles, asc });
    });
});

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