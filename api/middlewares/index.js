import jwt from 'jsonwebtoken';
import { users } from '../seed/seed';

import { AccountValidation, UserValidation, TransactionValidation } from '../helpers';

import accountMiddleware from './accountMiddleware';
import transactionMiddleware from './transactionMiddleware';
import userMiddleware from './UserMiddleware';
import authMiddleware from './auth';

export const AccountMiddleware = accountMiddleware({ AccountValidation });
export const TransactionMiddleware = transactionMiddleware({ TransactionValidation });
export const UserMiddleware = userMiddleware({ UserValidation });
export const AuthMiddleware = authMiddleware({ jwt, users });
