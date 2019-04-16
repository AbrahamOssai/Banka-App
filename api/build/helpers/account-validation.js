"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function accountValidation(_ref) {
  var joi = _ref.joi;

  /**
   * @exports
   * @class accountValidation
   */
  var AccountValidation =
  /*#__PURE__*/
  function () {
    function AccountValidation() {
      _classCallCheck(this, AccountValidation);
    }

    _createClass(AccountValidation, null, [{
      key: "validateAccount",

      /**
         * accountValidation
         * @staticmethod
         * @param  {object} req - Request object
         * @param {object} res - Response object
         * @param {function} next - middleware next (for error handling)
         * @return {json} res.json
         */
      value: function validateAccount(account) {
        var accountSchema = {
          email: joi.string().required(),
          type: joi.string().valid('saving', 'current'),
          openingBalance: joi.number().required()
        };
        return joi.validate(account, accountSchema);
      }
    }, {
      key: "validateUpdate",
      value: function validateUpdate(update) {
        var updateSchema = {
          status: joi.string().valid('active', 'dormant')
        };
        return joi.validate(update, updateSchema);
      }
    }]);

    return AccountValidation;
  }();

  return AccountValidation;
}

var _default = accountValidation;
exports["default"] = _default;