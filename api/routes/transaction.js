import express from 'express';

const router = express.Router();

function transRoutes(transDepends) {
  const {
    transactionController,
    transactionMiddleware,
  } = transDepends;

  const { debitAccount, creditAccount } = transactionController;
  const { validateTransaction } = transactionMiddleware;

  router.post('/debit', validateTransaction, debitAccount);
  router.post('/credit', validateTransaction, creditAccount);

  return router;
}

export default transRoutes;
