"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

function accountRoutes(_ref) {
  var AccountController = _ref.AccountController,
      AccountMiddleware = _ref.AccountMiddleware;
  var validateAccount = AccountMiddleware.validateAccount,
      validateUpdate = AccountMiddleware.validateUpdate;
  var createAccount = AccountController.createAccount,
      updateAccount = AccountController.updateAccount,
      deleteAccount = AccountController.deleteAccount,
      listAccount = AccountController.listAccount,
      singleAccount = AccountController.singleAccount;
  router.post('/', validateAccount, createAccount);
  router.get('/', listAccount);
  router.get('/:accountNumber', singleAccount);
  router.patch('/:accountNumber', validateUpdate, updateAccount);
  router["delete"]('/:accountNumber', deleteAccount);
  return router;
}

var _default = accountRoutes;
exports["default"] = _default;