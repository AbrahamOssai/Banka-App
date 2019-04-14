import express from 'express';
// body parser to read the data

// instantiate expressjs
const app = express();
const PORT = process.env.PORT || 5900;

// creating the api version route

// listening to our port
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});

export default app;
