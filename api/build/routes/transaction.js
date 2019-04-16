"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

function transRoutes(_ref) {
  var TransactionController = _ref.TransactionController,
      TransactionMiddleware = _ref.TransactionMiddleware;
  var debitAccount = TransactionController.debitAccount,
      creditAccount = TransactionController.creditAccount;
  var validateTransaction = TransactionMiddleware.validateTransaction;
  router.post('/debit', validateTransaction, debitAccount);
  router.post('/credit', validateTransaction, creditAccount);
  return router;
}

var _default = transRoutes;
exports["default"] = _default;