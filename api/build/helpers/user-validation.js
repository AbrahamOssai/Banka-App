"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function userValidation(_ref) {
  var joi = _ref.joi;

  /**
   * @exports
   * @class UserMiddleware
   */
  var UserValidation =
  /*#__PURE__*/
  function () {
    function UserValidation() {
      _classCallCheck(this, UserValidation);
    }

    _createClass(UserValidation, null, [{
      key: "validateUser",

      /**
         * UserMiddleware
         * @staticmethod
         * @param  {object} req - Request object
         * @param {object} res - Response object
         * @param {function} next - middleware next (for error handling)
         * @return {json} res.json
         */
      value: function validateUser(user) {
        var userSchema = {
          firstName: joi.string().min(3).trim().required(),
          lastName: joi.string().min(3).trim().required(),
          email: joi.string().email().trim().required(),
          password: joi.string().min(6).max(12).trim().required()
        };
        return joi.validate(user, userSchema);
      }
    }, {
      key: "validateLogin",
      value: function validateLogin(user) {
        var login = {
          email: joi.string().email().trim().required(),
          password: joi.string().min(6).trim().required()
        };
        return joi.validate(user, login);
      }
    }]);

    return UserValidation;
  }();

  return UserValidation;
}

var _default = userValidation;
exports["default"] = _default;