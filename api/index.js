import express, { Router } from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import v1routes from './version/version1';
// body parser to read the data

// instantiate expressjs
const app = express();
const PORT = process.env.PORT || 5900;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', v1routes({ Router }));
app.get('/', (req, res) => res.send({ message: 'Made it to the Root. Welcome...' }).status(200));
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));

export default app;
