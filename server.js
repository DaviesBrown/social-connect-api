/* eslint-disable jest/require-hook */
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const routes = require('./routes');
const dbClient = require('./utils/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbClient.connectDB();

app.use(cors());
app.use(express.json());

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}
app.use('/', logger, routes);

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Connect API',
      version: '1.0.0',
      description: 'An api for connecting with people online',
    },
    components: {
      securitySchemes: {
        sessionAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    security: [{ sessionAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
