"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function transactionValidation(_ref) {
  var joi = _ref.joi;

  var TransactionValidation =
  /*#__PURE__*/
  function () {
    function TransactionValidation() {
      _classCallCheck(this, TransactionValidation);
    }

    _createClass(TransactionValidation, null, [{
      key: "validateTransaction",
      value: function validateTransaction(transaction) {
        var transactionSchema = {
          type: joi.string().valid('debit', 'credit'),
          accountNumber: joi.string().min(5),
          cashier: joi.number().required(),
          amount: joi.number().required()
        };
        return joi.validate(transaction, transactionSchema);
      }
    }]);

    return TransactionValidation;
  }();

  return TransactionValidation;
}

var _default = transactionValidation;
exports["default"] = _default;