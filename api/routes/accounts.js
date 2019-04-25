import express from 'express';

const router = express.Router();
function accountRoutes({ AccountController, AccountMiddleware, AuthMiddleware }) {
  const { validateAccount, validateUpdate } = AccountMiddleware;

  const {
    createAccount,
    updateAccount,
    deleteAccount,
    listAccount,
    singleAccount,
    listTransactions,
  } = AccountController;

  const {
    isAdminOrStaff,
    isUserAdminOrStaff,
  } = AuthMiddleware;

  router.post('/', isUserAdminOrStaff, validateAccount, createAccount);

  router.get('/', isAdminOrStaff, listAccount);
  router.get('/:accountNumber', isUserAdminOrStaff, singleAccount);
  router.patch('/:accountNumber', isAdminOrStaff, validateUpdate, updateAccount);
  router.delete('/:accountNumber', isUserAdminOrStaff, deleteAccount);

  router.get('/:accountNumber/transactions', isUserAdminOrStaff, listTransactions);

  return router;
}

export default accountRoutes;
