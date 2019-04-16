"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable consistent-return */
function userContrl(_ref) {
  var users = _ref.users,
      jwt = _ref.jwt,
      bcrypt = _ref.bcrypt;

  /**
   * @exports
   * @class UserController
   */
  var UserController =
  /*#__PURE__*/
  function () {
    function UserController() {
      _classCallCheck(this, UserController);
    }

    _createClass(UserController, null, [{
      key: "registerUser",
      value: function registerUser(req, res) {
        var user = users.find(function (check) {
          return check.email === req.body.email;
        });

        if (user) {
          return res.status(400).json({
            status: 400,
            error: 'User already exist'
          });
        }

        user = {
          id: users.length + 1,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          type: req.body.type,
          password: bcrypt.hashSync(req.body.password)
        };
        users.push(user);
        var payload = {
          email: user.email,
          type: user.type
        };
        var token = jwt.sign(payload, 'privatekey', {
          expiresIn: '24h'
        });
        res.header('Authorization', token).status(201);
        res.json({
          status: 201,
          message: 'Registration successful',
          data: {
            token: token,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
          }
        });
      }
    }, {
      key: "loginUser",
      value: function loginUser(req, res) {
        var user = users.find(function (check) {
          return check.email === req.body.email;
        });

        if (!user) {
          return res.status(400).json({
            status: 400,
            error: 'Incorrect email'
          });
        }

        var check = bcrypt.compareSync(req.body.password, user.password);

        if (!check) {
          return res.status(400).json({
            status: 400,
            error: 'Incorrect password'
          });
        } // Generate token


        var payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
        var token = jwt.sign(payload, 'privatekey', {
          expiresIn: '24h'
        });
        res.json({
          status: 200,
          message: 'Login successful',
          data: {
            token: token,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      }
    }]);

    return UserController;
  }();

  return UserController;
}

var _default = userContrl;
exports["default"] = _default;