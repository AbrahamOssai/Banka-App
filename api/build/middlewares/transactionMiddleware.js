"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable consistent-return */

/* eslint-disable no-useless-escape */
function transactionMiddleware(_ref) {
  var TransactionValidation = _ref.TransactionValidation;

  /**
   *
   * @exports
   * @class transactionMiddleware
   */
  var TransactionMiddleware =
  /*#__PURE__*/
  function () {
    function TransactionMiddleware() {
      _classCallCheck(this, TransactionMiddleware);
    }

    _createClass(TransactionMiddleware, null, [{
      key: "validateTransaction",

      /**
         * transactionMiddleware
         * @staticmethod
         * @param  {object} req - Request object
         * @param {object} res - Response object
         * @param {function} next - middleware next (for error handling)
         * @return {json} res.json
         */
      value: function validateTransaction(req, res, next) {
        console.log(req.body);

        if (Object.keys(req.body).length === 0) {
          return res.status(400).json({
            status: 400,
            message: 'Please fill all fields'
          });
        }

        TransactionValidation.validateTransaction(req.body).then(function () {
          return next();
        })["catch"](function (err) {
          return res.status(400).json({
            status: 400,
            message: err.details[0].message
          });
        });
      }
    }]);

    return TransactionMiddleware;
  }();

  return TransactionMiddleware;
}

var _default = transactionMiddleware;
exports["default"] = _default;