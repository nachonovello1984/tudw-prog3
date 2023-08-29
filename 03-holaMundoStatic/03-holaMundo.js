const http = require('http');
const port = process.env.PORT || 3000;

function serveStaticFile(res, filePath, contentType, responseCode = 200) {
    const fs = require('fs');
    const path = require('path');
    const dir = path.dirname(__filename);
    fs.readFile(dir + filePath, (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('500 - Internal Error');
        }
        res.writeHead(responseCode, { 'Content-Type': `${contentType}; charset=utf-8` });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {

    //Quito los query params. Si era /institucional?nombre=Juan => queda /institucional
    let processedPath = req.url.indexOf('?') > 0 ? req.url.substring(0, req.url.indexOf('?')) : req.url;

    switch (processedPath) {
        case '/':
            serveStaticFile(res, '/public/index.html', 'text/html');
            break;
        case '/institucional':
            serveStaticFile(res, '/public/institucional.html', 'text/html');
            break;
        case '/contacto':
            serveStaticFile(res, '/public/contacto.html', 'text/html');
            break;
        case '/css/estilo.css':
            serveStaticFile(res, '/public/css/estilo.css', 'text/css');
            break;
        case '/img/logo.png':
            serveStaticFile(res, '/public/img/logo.png', 'image/png');
            break;
        case '/img/scaloni.gif':
            serveStaticFile(res, '/public/img/scaloni.gif', 'image/gif');
            break;
        default:
            serveStaticFile(res, '/public/error404.html', 'text/html');
            break;
    }
});
server.listen(port, () => console.log(`Servidor iniciado en el puerto: ${port}; `));