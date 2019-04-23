/* eslint-disable no-console */
import dotenv from 'dotenv';
import express, { Router } from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { Pool, Client } from 'pg';
import cors  from 'cors';

import v1routes from './version/version1';

// instantiate expressjs
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

// client.connect();

app.use('/api/v1', v1routes({ Router }));
app.get('/', (req, res) => res.send({ message: 'Made it to the Root. Welcome...' }).status(200));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ${process.env.DATABASE_URL}`);
});

export default app;
