import express from 'express';

const router = express.Router();

function transRoutes({ TransactionController, TransactionMiddleware, AuthMiddleware }) {
  const { debitAccount, creditAccount } = TransactionController;
  const { validateTransaction } = TransactionMiddleware;
  const { isStaff } = AuthMiddleware;

  router.post('/debit', isStaff, validateTransaction, debitAccount);
  router.post('/credit', isStaff, validateTransaction, creditAccount);

  return router;
}

export default transRoutes;
