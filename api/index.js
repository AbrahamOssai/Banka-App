/* eslint-disable no-console */
import express, { Router } from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import open from 'open';

import v1routes from './version/version1';

// instantiate expressjs
const app = express();

const PORT = process.env.PORT || 5000;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', v1routes({ Router }));
app.get('/', (req, res) => res.send({ message: 'Made it to the Root. Welcome...' }).status(200));
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  open('C:/Users/IFEANYICHUKWU/repos/Banka-App/index.html');
});

export default app;
