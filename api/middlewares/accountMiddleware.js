/* eslint-disable consistent-return */

function accountMiddleware({ AccountValidation }) {
  /**
   *
   * @exports
   * @class accountMiddleware
   */
  class AccountMiddleware {
  /**
     * accountMiddleware
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    static validateAccount(req, res, next) {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          status: 400,
          message: 'Please fill all fields',
        });
      }
      AccountValidation.validateAccount(req.body)
        .then(() => next())
        .catch(err => res.status(400).json({
          status: 400,
          message: err.details[0].message,
        }));
    }

    static validateUpdate(req, res, next) {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          status: 400,
          message: 'Please fill all fields',
        });
      }
      AccountValidation.validateUpdate(req.body)
        .then(() => next())
        .catch(err => res.status(400).json({
          status: 400,
          message: err.details[0].message,
        }));
    }
  }

  return AccountMiddleware;
}

export default accountMiddleware;
