"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

var _auth = _interopRequireDefault(require("./auth"));

var _accounts = _interopRequireDefault(require("./accounts"));

var _transaction = _interopRequireDefault(require("./transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import userRoute from './user';
function routes(_ref) {
  var Router = _ref.Router;
  var router = Router(); // Auth Routes

  router.use('/auth', (0, _auth["default"])({
    UserController: _controllers.UserController,
    UserMiddleware: _middlewares.UserMiddleware,
    Router: Router
  })); // User Routes
  // Account routes

  router.use('/accounts', (0, _accounts["default"])({
    AccountMiddleware: _middlewares.AccountMiddleware,
    AccountController: _controllers.AccountController,
    Router: Router
  })); // Transaction routes

  router.use('/transactions/:accountNumber', (0, _transaction["default"])({
    TransactionMiddleware: _middlewares.TransactionMiddleware,
    TransactionController: _controllers.TransactionController,
    Router: Router
  }));
  return router;
}

var _default = routes;
exports["default"] = _default;