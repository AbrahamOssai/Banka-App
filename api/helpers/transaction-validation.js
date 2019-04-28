
function transactionValidation({ joi }) {
  class TransactionValidation {
    static validateTransaction(transaction) {
      const transactionSchema = {
        // type: joi.string().valid('debit', 'credit'),
        // accountNumber: joi.string().min(5),
        // cashier: joi.number().required(),
        amount: joi.number().required(),
      };

      return joi.validate(transaction, transactionSchema);
    }
  }
  return TransactionValidation;
}

export default transactionValidation;
