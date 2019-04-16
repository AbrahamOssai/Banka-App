import express from 'express';

const router = express.Router();
function accountRoutes(accountDepends) {
  const {
    accountController,
    accountMiddleware,
  } = accountDepends;


  const { validateAccount, validateUpdate } = accountMiddleware;

  const {
    createAccount,
    updateAccount,
    deleteAccount,
    listAccount,
    singleAccount,
  } = accountController;

  router.post('/', validateAccount, createAccount);

  router.get('/', listAccount);
  router.get('/:accountNumber', singleAccount);
  router.patch('/:accountNumber', validateUpdate, updateAccount);
  router.delete('/:accountNumber', deleteAccount);


  return router;
}

export default accountRoutes;
