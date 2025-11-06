import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { testConnection } from './database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

async function startServer() {
  // Verificar conexión a la base de datos
  const dbConnected = await testConnection();
  if (!dbConnected) {
    console.error('No se pudo conectar a la base de datos. Verifica la configuración en .env');
    process.exit(1);
  }

  // Crear servidor Apollo
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Crear aplicación Express
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Servir archivos estáticos (cliente web)
  app.use(express.static(join(__dirname, 'public')));

  // Endpoint GraphQL
  app.use('/graphql', expressMiddleware(server));

  // Ruta principal
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
  });

  // Iniciar servidor
  app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║         Servidor GraphQL - Base de datos Sakila       ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log(`\n🚀 Servidor corriendo en http://${HOST}:${PORT}`);
    console.log(`📊 GraphQL Playground: http://${HOST}:${PORT}/graphql`);
    console.log(`🌐 Cliente Web: http://${HOST}:${PORT}`);
    console.log('\nPresiona Ctrl+C para detener el servidor\n');
  });
}

// Iniciar el servidor
startServer().catch((error) => {
  console.error('Error al iniciar el servidor:', error);
  process.exit(1);
});
