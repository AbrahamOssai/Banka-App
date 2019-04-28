/* eslint-disable radix */
import db from '../db';

function accountContrl({ moment, AuthHelp }) {
  /**
 * @exports
 * @class accountController
 */

  class AccountController {
    static async createAccount(req, res) {
      let user;

      try {
        let { rows } = await db.query('SELECT * FROM users');

        user = rows.find(row => row.email === req.body.email);

        if (!user) {
          return res.status(404).json({
            status: 404,
            error: 'sign up before creating account',
          });
        }
      } catch (err) {
        return res.status(400).json({
          status: 400,
          error: 'Error in connection, please try again',
        });
      }

      const {
        firstname, lastname, email,
      } = user;


      const query = 'INSERT INTO accounts(account_number, created_on, owner, type, status, balance ) VALUES($1,$2,$3,$4,$5,$6) returning *';

      const values = [
        3657878777, //Math.floor(Math.random() * 9000000000) + 1000000000,
        moment().format('LL', 'hh:mm'),
        user.id,
        req.body.type,
        'active',
        req.body.openingBalance,
      ];

      try {
        const { rows } = await db.query(query, values);

        const {
          account_number, type, balance,
        } = rows[0];

        return res.status(201).json({
          status: 201,
          message: 'Account created',
          data: {
            account_number,
            firstname,
            lastname,
            email,
            type,
            balance,
          },
        });
      } catch (err) {
        return res.status(400).json({
          status: 400,
          error: 'Error in connection, please try again',
        });
      }
    }

    static async updateAccount(req, res) {
      try {
        const { rows } = await db.query('SELECT * FROM accounts WHERE account_number = $1', [req.params.accountNumber]);

        const [account] = rows;

        if (!account) {
          return res.status(404).json({
            status: 404,
            error: 'Account not found',
          });
        }

        // Check if logged in user is authorised as account owner, admin or staff
        if (!(req.payload.isAdmin)) {
          return res.status(404).json({
            status: 404,
            error: 'You are not authorised to update account',
          });
        }
      } catch (err) {
        return res.status(400).json({
          status: 400,
          error: 'Error occured in fetching account Number',
        });
      }

      const query = 'UPDATE accounts SET status = $1 WHERE account_number = $2 RETURNING *';

      const values = [
        req.body.status,
        req.params.accountNumber,
      ];

      try {
        const { rows } = await db.query(query, values);

        const {
          account_number, status,
        } = rows[0];

        return res.status(200).json({
          status: 200,
          message: 'Successfully updated Account',
          data: {
            account_number,
            status,
          },
        });
      } catch (err) {
        return res.status(400).json({
          status: 400,
          error: 'Error in Updating Accounts',
        });
      }
    }

    static async deleteAccount(req, res) {
      // Try block to query database for account
      try {
        // Query database to get account to delete
        const { rows } = await db.query('SELECT * FROM accounts WHERE account_number = $1', [req.params.accountNumber]);

        const [account] = rows;

        // Check if account exists
        if (!account) {
          return res.status(404).json({
            status: 404,
            error: 'Account not found',
          });
        }

        // Check if logged in user is authorised as account owner, admin or staff
        if (!(req.payload.id === account.owner || req.payload.type === 'staff')) {
          return res.status(404).json({
            status: 404,
            error: 'You are not authorised to delete account',
          });
        }

      // Handle errors in fetching account
      } catch (err) {
        return res.status(400).json({
          status: 400,
          error: 'Error occured in fetching account Number',
        });
      }

      // Query to delete account from the database
      const query = 'DELETE FROM accounts WHERE account_number = $1 RETURNING *';

      const values = [
        req.params.accountNumber,
      ];

      // Try block handling deleting account from database
      try {
        const { rows } = await db.query(query, values);

        const [, account] = rows;

        if (!account) {
          return res.status(200).json({
            status: 200,
            message: 'Account successfully deleted',
          });
        }

        return res.error(400).json({
          status: 200,
          error: 'Failed to delete account, try again',
        });

      // Handle errors in deleting from database
      } catch (err) {
        return res.status(400).json({
          status: 400,
          error: 'Error in Deleting',
        });
      }
    }

    static async listAccount(req, res) {
      try {
        const { rows } = await db.query('SELECT * FROM accounts');

        const accounts = rows;

        return res.status(200).json({
          status: 200,
          message: 'List of accounts',
          data: accounts,
        });
      } catch (err) {
        return res.status(400).json({
          status: 400,
          error: 'Error in connection, please try again',
        });
      }
    }

    static async singleAccount(req, res) {
      try {
        const { rows } = await db.query('SELECT * FROM accounts WHERE account_number = $1', [req.params.accountNumber]);

        const accounts = rows;

        return res.status(200).json({
          status: 200,
          message: 'Single Account Successfully fetched',
          data: accounts,
        });
      } catch (err) {
        return res.status(400).json({
          status: 400,
          error: 'Error in connection, please try again',
        });
      }
    }

    static listTransactions(req, res) {

    }
  }

  return AccountController;
}

export default accountContrl;
