/* eslint-disable no-console */
import '@babel/polyfill';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';

import v1routes from './version/version1';


// instantiate expressjs
const app = express();
const PORT = process.env.PORT || 9000;

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Banka',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:9000',
  basePath: '/',
};
// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./**/routes/*.js', 'routes.js'], // pass all in array
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

dotenv.config();
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db.createAccountTable();
// db.createTransactionTable();
// db.createUserTable();

// db.dropTables('users');
// db.dropTables('transactions');
// db.dropTables('accounts');
// db.dropTables('students');

app.use('/api/v1', v1routes({ Router }));
app.get('/', (req, res) => res.send({ message: 'Made it to the Root. Welcome...' }).status(200));

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

export default app;
