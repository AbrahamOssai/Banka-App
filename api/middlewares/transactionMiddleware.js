/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */

function transactionMiddleware({ TransactionValidation }) {
  /**
   *
   * @exports
   * @class transactionMiddleware
   */
  class TransactionMiddleware {
    /**
       * transactionMiddleware
       * @staticmethod
       * @param  {object} req - Request object
       * @param {object} res - Response object
       * @param {function} next - middleware next (for error handling)
       * @return {json} res.json
       */

    static validateTransaction(req, res, next) {
      console.log(req.body);
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          status: 400,
          message: 'Please fill all fields',
        });
      }
      TransactionValidation.validateTransaction(req.body)
        .then(() => next())
        .catch(err => res.status(400).json({
          status: 400,
          message: err.details[0].message,
        }));
    }
  }

  return TransactionMiddleware;
}

export default transactionMiddleware;
