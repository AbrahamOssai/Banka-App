/* eslint-disable radix */
import db from '../db';


function transactionContrl({ moment }) {
  /**
   * @exports
   * @class transactionContrl
   */
  class TransactionController {
    static async debitAccount(req, res) {
      // Declare variable to store account for debit
      let account;

      // Try block to query database for account
      try {
        // Retrieve account to be debited
        const { rows } = await db.query('SELECT * FROM accounts WHERE account_number = $1', [req.params.accountNumber]);

        [account] = rows;

        // Check if account exists
        if (!account) {
          return res.status(404).json({
            status: 404,
            error: 'Account not found',
          });
        }

        // Check that account has sufficient balance to be debited
        if (parseFloat(account.balance) < parseFloat(req.body.amount)) {
          return res.status(400).json({
            status: 400,
            error: 'Insuficient balance',
          });
        }

      // Handle error in retrieving account to be debited
      } catch (err) {
        return res.status(404).json({
          status: 404,
          error: 'Error in getting account',
        });
      }

      // Store old account balance
      const oldBalance = account.balance;

      // Execute debit calculation
      const newBalance = parseFloat(account.balance) - parseFloat(req.body.amount);

      // Query to create a new transaction
      const query = 'INSERT INTO transactions( createdon, type, accountnumber, cashier, amount, oldbalance, newbalance ) VALUES($1,$2,$3,$4,$5,$6,$7) returning *';

      // Values for query
      const values = [
        moment().format('LL', 'hh:mm'),
        'debit',
        account.account_number,
        req.payload.id,
        req.body.amount,
        oldBalance,
        newBalance.toString(),
      ];

      // Try block to create and store debit transaction in database
      try {
        const { rows } = await db.query(query, values);

        const {
          id, accountnumber, amount, cashier, type, newbalance,
        } = rows[0];

        // Query to update balance on the debited account
        const accountQuery = 'UPDATE accounts SET balance = $1 WHERE account_number = $2 RETURNING *';

        const accountValues = [
          newBalance.toString(),
          req.params.accountNumber,
        ];

        // Try block to update balance on debited account
        try {
          const { rows } = await db.query(accountQuery, accountValues);

          // return data for successful debit transaction
          return res.status(201).json({
            status: 201,
            message: 'Account successfully debited',
            data: {
              id,
              accountnumber,
              amount,
              cashier,
              type,
              newbalance,
            },
          });

        // Handle error with updating account balance
        } catch (err) {
          return res.status(400).json({
            status: 400,
            error: 'Error in updating account',
          });
        }

      // Handle error with storing transaction
      } catch (err) {
        return res.status(400).json({
          status: 400,
          error: 'Error in creating transaction',
        });
      }
    }

    static async creditAccount(req, res) {
      // Declare variable to store account for credit
      let account;

      // Try block to query database for account
      try {
        // Retrieve account to be credited
        const { rows } = await db.query('SELECT * FROM accounts WHERE account_number = $1', [req.params.accountNumber]);

        [account] = rows;

        // Check if account exists
        if (!account) {
          return res.status(404).json({
            status: 404,
            error: 'Account not found',
          });
        }

      // Handle error in retrieving account to be credited
      } catch (err) {
        return res.status(404).json({
          status: 404,
          error: 'Error in getting account',
        });
      }

      // Store old account balance
      const oldBalance = account.balance;

      // Execute credit calculation
      const newBalance = parseFloat(account.balance) + parseFloat(req.body.amount);

      // Query to create a new transaction
      const query = 'INSERT INTO transactions( createdon, type, accountnumber, cashier, amount, oldbalance, newbalance ) VALUES($1,$2,$3,$4,$5,$6,$7) returning *';

      // Values for query
      const values = [
        moment().format('LL', 'hh:mm'),
        'credit',
        account.account_number,
        req.payload.id,
        req.body.amount,
        oldBalance,
        newBalance.toString(),
      ];

      // Try block to create and store credit transaction in database
      try {
        const { rows } = await db.query(query, values);

        const {
          id, accountnumber, amount, cashier, type, newbalance,
        } = rows[0];

        // Query to update balance on the debited account
        const accountQuery = 'UPDATE accounts SET balance = $1 WHERE account_number = $2 RETURNING *';

        const accountValues = [
          newBalance.toString(),
          req.params.accountNumber,
        ];

        // Try block to update balance on debited account
        try {
          const { rows } = await db.query(accountQuery, accountValues);

          // return data for successful debit transaction
          return res.status(201).json({
            status: 201,
            message: 'Account successfully credited',
            data: {
              id,
              accountnumber,
              amount,
              cashier,
              type,
              newbalance,
            },
          });

        // Handle error with updating account balance
        } catch (err) {
          return res.status(404).json({
            status: 404,
            error: 'Error in updating account',
          });
        }

      // Handle error with storing transaction
      } catch (err) {
        return res.status(400).json({
          status: 400,
          error: 'Error in creating transaction',
        });
      }
    }
  }

  return TransactionController;
}

export default transactionContrl;
