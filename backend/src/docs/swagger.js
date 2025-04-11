const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'yukichi.vote API',
      version: '1.0.0',
      description: 'yukichi.fun 投票システム API ドキュメント'
    }
  },
  apis: ['./src/api/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};
