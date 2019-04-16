/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
import validate from '../helpers/transaction-validation';

/**
 *
 * @exports
 * @class transactionMiddleware
 */
class transactionMiddleware {
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
    validate.validateTransaction(req.body)
      .then(() => next())
      .catch(err => res.status(400).json({
        status: 400,
        message: err.details[0].message,
      }));
  }
}

export default transactionMiddleware;
