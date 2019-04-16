import express from 'express';

const router = express.Router();
function accountRoutes({ AccountController, AccountMiddleware }) {
  const { validateAccount, validateUpdate } = AccountMiddleware;

  const {
    createAccount,
    updateAccount,
    deleteAccount,
    listAccount,
    singleAccount,
  } = AccountController;

  router.post('/', validateAccount, createAccount);

  router.get('/', listAccount);
  router.get('/:accountNumber', singleAccount);
  router.patch('/:accountNumber', validateUpdate, updateAccount);
  router.delete('/:accountNumber', deleteAccount);

  return router;
}

export default accountRoutes;
