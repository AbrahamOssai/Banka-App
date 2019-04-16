import { AccountValidation, UserValidation, TransactionValidation } from '../helpers';

import accountMiddleware from './accountMiddleware';
import transactionMiddleware from './transactionMiddleware';
import userMiddleware from './UserMiddleware';

export const AccountMiddleware = accountMiddleware({ AccountValidation });
export const TransactionMiddleware = transactionMiddleware({ TransactionValidation });
export const UserMiddleware = userMiddleware({ UserValidation });
