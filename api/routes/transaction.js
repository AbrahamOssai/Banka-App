import express from 'express';

const router = express.Router({ mergeParams: true });

function transRoutes({ TransactionController, TransactionMiddleware, AuthMiddleware }) {
  const { debitAccount, creditAccount } = TransactionController;
  const { validateTransaction } = TransactionMiddleware;
  const { isStaff } = AuthMiddleware;


  /**
 * @swagger
 * /api/v1/transactions/debit:
 *   post:
 *     tags:
 *       - transactions
 *     description: Creates a new debit transaction
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of transaction
 *         schema:
 *           $ref: '#/definitions/transactions'
 */
  router.post('/debit', isStaff, validateTransaction, debitAccount);

  /**
 * @swagger
 * /api/v1/transactions/debit:
 *   post:
 *     tags:
 *       - transactions
 *     description: Creates a new credit transaction
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of transaction
 *         schema:
 *           $ref: '#/definitions/transactions'
 */
  router.post('/credit', isStaff, validateTransaction, creditAccount);

  return router;
}

export default transRoutes;
