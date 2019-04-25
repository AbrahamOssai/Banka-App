/* eslint-disable no-console */
import dotenv from 'dotenv';
import express, { Router } from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { Pool, Client } from 'pg';
import cors  from 'cors';

import v1routes from './version/version1';
import db from './db';

// instantiate expressjs
const app = express();
const PORT = process.env.PORT || 9000;

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

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ${process.env.DATABASE_URL}`);
});

export default app;
