"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserValidation = exports.TransactionValidation = exports.AccountValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _accountValidation = _interopRequireDefault(require("./account-validation"));

var _transactionValidation = _interopRequireDefault(require("./transaction-validation"));

var _userValidation = _interopRequireDefault(require("./user-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AccountValidation = (0, _accountValidation["default"])({
  joi: _joi["default"]
});
exports.AccountValidation = AccountValidation;
var TransactionValidation = (0, _transactionValidation["default"])({
  joi: _joi["default"]
});
exports.TransactionValidation = TransactionValidation;
var UserValidation = (0, _userValidation["default"])({
  joi: _joi["default"]
});
exports.UserValidation = UserValidation;