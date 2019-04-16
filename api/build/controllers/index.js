"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = exports.TransactionController = exports.AccountController = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _moment = _interopRequireDefault(require("moment"));

var _seed = require("../seed/seed");

var _accountController = _interopRequireDefault(require("./accountController"));

var _transactionController = _interopRequireDefault(require("./transactionController"));

var _userController = _interopRequireDefault(require("./userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AccountController = (0, _accountController["default"])({
  users: _seed.users,
  accounts: _seed.accounts,
  moment: _moment["default"]
});
exports.AccountController = AccountController;
var TransactionController = (0, _transactionController["default"])({
  transactions: _seed.transactions,
  accounts: _seed.accounts,
  moment: _moment["default"]
});
exports.TransactionController = TransactionController;
var UserController = (0, _userController["default"])({
  users: _seed.users,
  jwt: _jsonwebtoken["default"],
  bcrypt: _bcryptjs["default"]
});
exports.UserController = UserController;