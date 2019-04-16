
function accountValidation({ joi }) {
  /**
   * @exports
   * @class accountValidation
   */
  class AccountValidation {
    /**
       * accountValidation
       * @staticmethod
       * @param  {object} req - Request object
       * @param {object} res - Response object
       * @param {function} next - middleware next (for error handling)
       * @return {json} res.json
       */

    static validateAccount(account) {
      const accountSchema = {
        email: joi.string().required(),
        type: joi.string().valid('saving', 'current'),
        openingBalance: joi.number().required(),
      };

      return joi.validate(account, accountSchema);
    }

    static validateUpdate(update) {
      const updateSchema = {
        status: joi.string().valid('active', 'dormant'),
      };

      return joi.validate(update, updateSchema);
    }
  }

  return AccountValidation;
}

export default accountValidation;
