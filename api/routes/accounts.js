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


  /**
 * @swagger
 * definition:
 *   accounts:
 *     properties:
 *       id:
 *         type: string
 *       createdon:
 *         type: string
 *       type:
 *         type: integer
 *       accountnumber:
 *         type: string
 *       cashier:
 *         type: string
 *       amount:
 *         type: string
 *       oldbalance:
 *         type: string
 *       newbalance:
 *         type: string
 */
  /**
 * @swagger
 * /api/v1/accounts:
 *   get:
 *     tags:
 *       - accounts
 *     description: Returns all accounts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of accounts
 *         schema:
 *           $ref: '#/definitions/account'
 */
  router.get('/', isAdminOrStaff, listAccount);

  /**
 * @swagger
 * /api/v1/accounts:
 *   post:
 *     tags:
 *       - accounts
 *     description: Creates a new accounts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of accounts
 *         schema:
 *           $ref: '#/definitions/account'
 */
  router.post('/', isUserAdminOrStaff, validateAccount, createAccount);

  /**
 * @swagger
 * /api/v1/accounts/{accountNumber}:
 *   get:
 *     tags:
 *       - accounts
 *     description: Returns a single account
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of account
 *         schema:
 *           $ref: '#/definitions/account'
 */
  router.get('/:accountNumber', isUserAdminOrStaff, singleAccount);

  /**
 * @swagger
 * /api/v1/accounts/{accountNumber}:
 *   patch:
 *     tags:
 *       - accounts
 *     description: Updates and Returns a single account
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         schema:
 *           $ref: '#/definitions/account'
 */
  router.patch('/:accountNumber', isAdminOrStaff, validateUpdate, updateAccount);

  /**
 * @swagger
 * /api/v1/accounts/{accountNumber}:
 *   delete:
 *     tags:
 *       - accounts
 *     description: Deletes a single account
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Succesfully deleted
 *         schema:
 *           $ref: '#/definitions/account'
 */
  router.delete('/:accountNumber', isUserAdminOrStaff, deleteAccount);

  /**
 * @swagger
 * /api/v1/accounts/{accountNumber}/transactions:
 *   get:
 *     tags:
 *       - accounts
 *     description: Returns a transactions of single account
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of transactions
 *         schema:
 *           $ref: '#/definitions/account'
 */
  router.get('/:accountNumber/transactions', isUserAdminOrStaff, listTransactions);

  return router;
}

export default accountRoutes;
