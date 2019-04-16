import UserController from '../controllers/userController';
import accountController from '../controllers/accountController';
import transactionController from '../controllers/transactionController';

import UserMiddleware from '../middlewares/UserMiddleware';
import accountMiddleware from '../middlewares/accountMiddleware';
import transactionMiddleware from '../middlewares/transactionMiddleware';

import authRoute from './auth';
import accountRoute from './accounts';
import transRoute from './transaction';
// import userRoute from './user';

function routes({ Router }) {
  const router = Router();
  // Auth Routes
  router.use('/auth', authRoute({ UserController, UserMiddleware, Router }));

  // User Routes

  // Account routes
  router.use('/accounts', accountRoute({ accountMiddleware, accountController, Router }));

  // Transaction routes
  router.use('/transactions/:accountNumber', transRoute({ transactionMiddleware, transactionController, Router }));

  return router;
}

export default routes;
