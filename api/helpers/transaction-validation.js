import Joi from 'joi';

class transactionValidation {
  static validateTransaction(transaction) {
    const transactionSchema = {
      type: Joi.string().valid('debit', 'credit'),
      accountNumber: Joi.string().min(5),
      cashier: Joi.number().required(),
      amount: Joi.number().required(),
    };

    return Joi.validate(transaction, transactionSchema);
  }
}
export default transactionValidation;
