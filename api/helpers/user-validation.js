
function userValidation({ joi }) {
  /**
   * @exports
   * @class UserMiddleware
   */
  class UserValidation {
    /**
       * UserMiddleware
       * @staticmethod
       * @param  {object} req - Request object
       * @param {object} res - Response object
       * @param {function} next - middleware next (for error handling)
       * @return {json} res.json
       */

    static validateUser(user) {
      const userSchema = {
        firstName: joi
          .string()
          .min(3)
          .trim()
          .required(),
        lastName: joi
          .string()
          .min(3)
          .trim()
          .required(),
        email: joi
          .string()
          .email()
          .trim()
          .required(),
        password: joi
          .string()
          .min(6)
          .max(12)
          .trim()
          .required(),
      };
      return joi.validate(user, userSchema);
    }

    static validateLogin(user) {
      const login = {
        email: joi
          .string()
          .email()
          .trim()
          .required(),
        password: joi
          .string()
          .min(6)
          .trim()
          .required(),
      };
      return joi.validate(user, login);
    }
  }

  return UserValidation;

}

export default userValidation;
