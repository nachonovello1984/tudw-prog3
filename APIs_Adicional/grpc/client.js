import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
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

// Crear el cliente
function main() {
  // Conectar al servidor
  const client = new automovilesProto.AutomovilService(
    `${process.env.HOST}:${process.env.PORT}`,
    grpc.credentials.createInsecure()
  );
  
  console.log(`Cliente gRPC conectado al servidor en ${process.env.HOST}:${process.env.PORT}`);
  console.log('Solicitando lista de automóviles...\n');
  
  // Llamar al método ObtenerAutomoviles
  client.ObtenerAutomoviles({}, (error, response) => {
    if (error) {
      console.error('Error al obtener automóviles:', error);
      return;
    }
    
    console.log('=== LISTA DE AUTOMÓVILES ===\n');
    
    // Mostrar cada automóvil
    response.automoviles.forEach((auto, index) => {
      console.log(`Automóvil #${index + 1}:`);
      console.log(`  ID: ${auto.id}`);
      console.log(`  Marca: ${auto.marca}`);
      console.log(`  Modelo: ${auto.modelo}`);
      console.log(`  Año: ${auto.anio}`);
      console.log(`  Color: ${auto.color}`);
      console.log(`  Precio: $${auto.precio.toFixed(2)}`);
      console.log('----------------------------');
    });
    
    console.log(`\nTotal de automóviles: ${response.automoviles.length}`);
  });
}

// Ejecutar el cliente
main();
