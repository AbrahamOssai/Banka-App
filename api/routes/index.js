import {
  UserController, AccountController, TransactionController,
} from '../controllers';

import {
  UserMiddleware, AccountMiddleware, TransactionMiddleware,
} from '../middlewares';

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
  router.use('/accounts', accountRoute({ AccountMiddleware, AccountController, Router }));

  // Transaction routes
  router.use('/transactions/:accountNumber', transRoute({ TransactionMiddleware, TransactionController, Router }));

  return router;
}

export default routes;
