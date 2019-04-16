"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMiddleware = exports.TransactionMiddleware = exports.AccountMiddleware = void 0;

var _helpers = require("../helpers");

var _accountMiddleware = _interopRequireDefault(require("./accountMiddleware"));

var _transactionMiddleware = _interopRequireDefault(require("./transactionMiddleware"));

var _UserMiddleware = _interopRequireDefault(require("./UserMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AccountMiddleware = (0, _accountMiddleware["default"])({
  AccountValidation: _helpers.AccountValidation
});
exports.AccountMiddleware = AccountMiddleware;
var TransactionMiddleware = (0, _transactionMiddleware["default"])({
  TransactionValidation: _helpers.TransactionValidation
});
exports.TransactionMiddleware = TransactionMiddleware;
var UserMiddleware = (0, _UserMiddleware["default"])({
  UserValidation: _helpers.UserValidation
});
exports.UserMiddleware = UserMiddleware;