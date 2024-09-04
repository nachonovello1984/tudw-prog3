import http from 'http';
const port = 3000;
const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' })
	res.end('Hola Mundo!')
});
server.listen(port, () => console.log(`Servidor iniciado en el puerto: ${port};`));