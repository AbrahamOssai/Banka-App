import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import moment from 'moment';

import { users, accounts, transactions } from '../seed/seed';

import accountController from './accountController';
import transactionController from './transactionController';
import userController from './userController';

export const AccountController = accountController({ users, accounts, moment });
export const TransactionController = transactionController({ transactions, accounts, moment });
export const UserController = userController({ users, jwt, bcrypt });
