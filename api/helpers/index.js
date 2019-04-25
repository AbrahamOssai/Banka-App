import joi from 'joi';
import jwt from 'jsonwebtoken';

import accountValidation from './account-validation';
import transactionValidation from './transaction-validation';
import userValidation from './user-validation';
import authHelp from './auth-help';

export const AccountValidation = accountValidation({ joi });
export const TransactionValidation = transactionValidation({ joi });
export const UserValidation = userValidation({ joi });
export const AuthHelp = authHelp({ jwt });
