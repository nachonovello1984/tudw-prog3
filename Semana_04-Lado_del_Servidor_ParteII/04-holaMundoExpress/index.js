import express from 'express';
const app = express();
const port = 3000;

//Rutas
app.get('/', (req, res) => {
    res.type('text/plain');
    res.status(200);
    res.send('Hola soy una app Express!');
    /*
    //Respuesta con HTML
    res.type('text/html');
    res.status(200);
    res.send(`<html>
    <head></head>
    <body><h1>🏠 Hola soy una app Express!!</h1>
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/institucional">Institucional</a></li>
        <li><a href="/contacto">Contacto</a></li>
    </ul>
    </body>
    </html>`);
    */
});

app.get('/institucional', (req, res) => {
    res.type('text/plain');
    res.status(200);
    res.send('🏢 Institucional');
});

app.get('/contacto', (req, res) => {
    res.type('text/plain');
    res.status(200);
    res.send('📧 Contacto');
});

// Página personalizada de error 404
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Recurso solicitado no encontrado');
});

// Página personalizada de error 500
app.use((err, req, res, next) => {
    console.error(err.message);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Error interno del servidor');
})

app.listen(port, () => console.log(`Express iniciado en http://localhost:${port}`));