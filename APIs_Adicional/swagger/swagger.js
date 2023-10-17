const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version (Swagger 2.0 uses '2.0').
    info: {
      title: 'Título',
      version: '1.0.0',
      description: 'API documentation for your Express API',
    },
  },
  apis: ['./index.js'], // Path to your API route files.
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
