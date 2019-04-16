import express from 'express';
// body parser to read the data

// instantiate expressjs
const app = express();
const PORT = process.env.PORT || 5900;

<<<<<<< Updated upstream
// creating the api version route

// listening to our port
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
=======
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', v1routes({ Router }));
app.get('/', (req, res) => res.send({ message: 'Made it to the Root. Welcome...' }).status(200));
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
>>>>>>> Stashed changes

export default app;
