"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

function authRoutes(_ref) {
  var UserController = _ref.UserController,
      UserMiddleware = _ref.UserMiddleware;
  var validateLogin = UserMiddleware.validateLogin,
      validateSignup = UserMiddleware.validateSignup;
  var loginUser = UserController.loginUser,
      registerUser = UserController.registerUser;
  router.post('/signup', validateSignup, registerUser);
  router.post('/signin', validateLogin, loginUser);
  return router;
}

var _default = authRoutes;
exports["default"] = _default;