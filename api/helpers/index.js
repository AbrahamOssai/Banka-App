import joi from 'joi';

import accountValidation from './account-validation';
import transactionValidation from './transaction-validation';
import userValidation from './user-validation';

export const AccountValidation = accountValidation({ joi });
export const TransactionValidation = transactionValidation({ joi });
export const UserValidation = userValidation({ joi });
