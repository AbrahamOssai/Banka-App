import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import authHelp from '../helpers/auth-help';

import { users, accounts, transactions } from '../seed/seed';

import accountController from './accountController';
import transactionController from './transactionController';
import userController from './userController';

const AuthHelp = authHelp({ jwt });

export const AccountController = accountController({
  users, accounts, moment, AuthHelp,
});

export const TransactionController = transactionController({ transactions, accounts, moment });
export const UserController = userController({ users, jwt, bcrypt });
