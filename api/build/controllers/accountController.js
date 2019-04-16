"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable radix */
function accountContrl(_ref) {
  var users = _ref.users,
      accounts = _ref.accounts,
      moment = _ref.moment;

  /**
  * @exports
  * @class accountController
  */
  var AccountController =
  /*#__PURE__*/
  function () {
    function AccountController() {
      _classCallCheck(this, AccountController);
    }

    _createClass(AccountController, null, [{
      key: "createAccount",
      value: function createAccount(req, res) {
        var account = users.find(function (user) {
          return user.email === req.body.email;
        });

        if (!account) {
          return res.status(400).json({
            status: 400,
            error: 'sign up before creating account'
          });
        }

        account = {
          id: accounts.length + 1,
          accountNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
          createdOn: moment().format('LL', 'hh:mm'),
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
          type: req.body.type,
          openingBalance: req.body.openingBalance,
          status: 'active'
        };
        accounts.push(account);
        return res.status(201).json({
          status: 201,
          message: 'Account created',
          data: account
        });
      }
    }, {
      key: "updateAccount",
      value: function updateAccount(req, res) {
        var account = accounts.find(function (num) {
          return num.accountNumber === parseInt(req.params.accountNumber);
        });

        if (!account) {
          return res.status(400).json({
            status: 400,
            error: 'Account not found'
          });
        }

        account.status = req.body.status;
        return res.status(200).json({
          status: 200,
          message: 'Account updated',
          data: account
        });
      }
    }, {
      key: "deleteAccount",
      value: function deleteAccount(req, res) {
        var account = accounts.find(function (num) {
          return num.accountNumber === parseInt(req.params.accountNumber);
        });

        if (!account) {
          return res.status(400).json({
            status: 400,
            error: 'Account not found'
          });
        }

        var index = accounts.indexOf(account);
        accounts.splice(index);
        return res.status(200).json({
          status: 200,
          message: 'Account deleted'
        });
      }
    }, {
      key: "listAccount",
      value: function listAccount(req, res) {
        return res.status(200).json({
          status: 200,
          message: 'List of accounts',
          data: accounts
        });
      }
    }, {
      key: "singleAccount",
      value: function singleAccount(req, res) {
        var account = accounts.find(function (num) {
          return num.accountNumber === parseInt(req.params.accountNumber);
        });

        if (!account) {
          return res.status(400).json({
            status: 400,
            error: 'Account not found'
          });
        }

        return res.status(200).json({
          status: 200,
          data: account
        });
      }
    }]);

    return AccountController;
  }();

  return AccountController;
}

var _default = accountContrl;
exports["default"] = _default;