import routes from '../routes';

function v1Module({ Router }) {
  const router = Router();

  router.get('/', (req, res) => res.status(200).json({
    status: '200',
    message: 'Welcome to BANKA-APP version 1',
  }));

  router.use('/', routes({ Router }));
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  router.use((req, res) => res.status(400).send({
    message: 'Sorry that route/method doesnt exist',
  }));

  return router;
}

export default v1Module;
