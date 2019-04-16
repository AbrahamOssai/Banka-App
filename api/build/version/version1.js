"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function v1Module(_ref) {
  var Router = _ref.Router;
  var router = Router();
  router.get('/', function (req, res) {
    return res.status(200).json({
      status: '200',
      message: 'Welcome to BANKA-APP version 1'
    });
  });
  router.use('/', (0, _routes["default"])({
    Router: Router
  }));
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  router.use(function (req, res) {
    return res.status(400).send({
      message: 'Sorry that route/method doesnt exist'
    });
  });
  return router;
}

var _default = v1Module;
exports["default"] = _default;