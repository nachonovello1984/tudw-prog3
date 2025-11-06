import express from 'express';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Iniciar servidor HTTP
const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP corriendo en http://${HOST}:${PORT}`);
  console.log(`Servidor WebSocket corriendo en ws://${HOST}:${PORT}`);
});

// Crear servidor WebSocket
const wss = new WebSocketServer({ server });

// Almacenar clientes conectados
const clients = new Set();

// Manejar conexiones WebSocket
wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');
  clients.add(ws);

  // Enviar mensaje de bienvenida
  ws.send(JSON.stringify({
    type: 'system',
    message: '¡Bienvenido al chat!',
    timestamp: new Date().toISOString(),
    totalUsers: clients.size
  }));

  // Notificar a todos que un nuevo usuario se unió
  broadcast({
    type: 'system',
    message: 'Un nuevo usuario se ha unido al chat',
    timestamp: new Date().toISOString(),
    totalUsers: clients.size
  }, ws);

  // Manejar mensajes recibidos
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('Mensaje recibido:', message);

      // Agregar timestamp y tipo
      const messageData = {
        type: 'message',
        username: message.username || 'Anónimo',
        message: message.message,
        timestamp: new Date().toISOString()
      };

      // Broadcast a todos los clientes
      broadcast(messageData);
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
    }
  });

  // Manejar desconexión
  ws.on('close', () => {
    console.log('Cliente desconectado');
    clients.delete(ws);

    // Notificar a todos que un usuario se fue
    broadcast({
      type: 'system',
      message: 'Un usuario ha salido del chat',
      timestamp: new Date().toISOString(),
      totalUsers: clients.size
    });
  });

  // Manejar errores
  ws.on('error', (error) => {
    console.error('Error en WebSocket:', error);
  });
});

// Función para enviar mensajes a todos los clientes
function broadcast(data, exclude = null) {
  const message = JSON.stringify(data);
  
  clients.forEach((client) => {
    if (client !== exclude && client.readyState === 1) { // 1 = OPEN
      client.send(message);
    }
  });
}

// Manejar cierre del servidor
process.on('SIGINT', () => {
  console.log('\nCerrando servidor...');
  wss.close(() => {
    console.log('Servidor WebSocket cerrado');
    process.exit(0);
  });
});
