/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
import validate from '../helpers/user-validation';

/**
 *
 * @exports
 * @class UserMiddleware
 */
class UserMiddleware {
  /**
     * UserMiddleware
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */

  static validateSignup(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Please fill all fields',
      });
    }

    validate
      .validateUser(req.body)
      .then(() => next())
      .catch(err => res.status(400).json({
        status: 400,
        message: err.details[0].message,
      }));
  }

  // eslint-disable-next-line consistent-return
  static validateLogin(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Please fill all fields',
      });
    }
    validate.validateLogin(req.body)
      .then(() => next())
      .catch(err => res.status(400).json({
        status: 400,
        message: err.details[0].message,
      }));
  }
}

export default UserMiddleware;
