/* eslint-disable radix */
import moment from 'moment';
import { users, accounts } from '../seed/seed';

/**
 * @exports
 * @class accountController
 */

class accountController {
  static createAccount(req, res) {
    let account = users.find(user => user.email === req.body.email);
    if (!account) {
      return res.status(400).json({
        status: 400,
        error: 'sign up before creating account',
      });
    }

    account = {
      id: accounts.length + 1,
      accountNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
      createdOn: moment().format('LL', 'hh:mm'),
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      type: req.body.type,
      openingBalance: req.body.openingBalance,
      status: 'active',
    };
    accounts.push(account);
    return res
      .status(201)
      .json({
        status: 201,
        message: 'Account created',
        data: account,
      });
  }

  static updateAccount(req, res) {
    const account = accounts.find(num => num.accountNumber === parseInt(req.params.accountNumber));
    if (!account) {
      return res.status(400).json({
        status: 400,
        error: 'Account not found',
      });
    }


    account.status = req.body.status;
    return res.status(200).json({
      status: 200,
      message: 'Account updated',
      data: account,
    });
  }

  static deleteAccount(req, res) {
    const account = accounts.find(num => num.accountNumber === parseInt(req.params.accountNumber));
    if (!account) {
      return res.status(400).json({
        status: 400,
        error: 'Account not found',
      });
    }

    const index = accounts.indexOf(account);
    accounts.splice(index);

    return res.status(200).json({
      status: 200,
      message: 'Account deleted',
    });
  }

  static listAccount(req, res) {
    return res
      .status(200)
      .json({
        status: 200,
        message: 'List of accounts',
        data: accounts,
      });
  }

  static singleAccount(req, res) {
    const account = accounts.find(num => num.accountNumber === parseInt(req.params.accountNumber));
    if (!account) {
      return res.status(400).json({
        status: 400,
        error: 'Account not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: account,
    });
  }
}
export default accountController;
