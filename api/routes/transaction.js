import express from 'express';

const router = express.Router();

function transRoutes({ TransactionController, TransactionMiddleware }) {
  const { debitAccount, creditAccount } = TransactionController;
  const { validateTransaction } = TransactionMiddleware;

  router.post('/debit', validateTransaction, debitAccount);
  router.post('/credit', validateTransaction, creditAccount);

  return router;
}

export default transRoutes;
