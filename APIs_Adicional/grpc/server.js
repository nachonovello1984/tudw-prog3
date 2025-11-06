import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import automoviles from './automoviles.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
dotenv.config();

// Obtener __filename y __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construir la ruta al archivo
const PROTO_PATH = path.join(__dirname, 'automoviles.proto');

// Configuración para cargar el archivo .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Cargar el paquete proto
const automovilesProto = grpc.loadPackageDefinition(packageDefinition).automoviles;

// Implementación del método ObtenerAutomoviles
function obtenerAutomoviles(call, callback) {
  console.log('Cliente solicitó la lista de automóviles');
  
  // Devolver el array de automóviles
  callback(null, { automoviles: automoviles });
}

// Crear y configurar el servidor
function main() {
  const server = new grpc.Server();
  
  // Agregar el servicio al servidor
  server.addService(automovilesProto.AutomovilService.service, {
    ObtenerAutomoviles: obtenerAutomoviles
  });
  
  // Configurar el puerto y credenciales
  const PORT = `0.0.0.0:${process.env.PORT}`;
  server.bindAsync(
    PORT,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error('Error al iniciar el servidor:', error);
        return;
      }
      console.log(`Servidor gRPC escuchando en el puerto ${port}`);
      console.log('Esperando solicitudes de clientes...');
    }
  );
}

// Iniciar el servidor
main();
