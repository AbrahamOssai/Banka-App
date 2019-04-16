"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable radix */
function transactionContrl(_ref) {
  var moment = _ref.moment,
      transactions = _ref.transactions,
      accounts = _ref.accounts;

  /**
   * @exports
   * @class accountController
   */
  var transactionController =
  /*#__PURE__*/
  function () {
    function transactionController() {
      _classCallCheck(this, transactionController);
    }

    _createClass(transactionController, null, [{
      key: "debitAccount",
      value: function debitAccount(req, res) {
        var accountNum = req.params.accountNumber;
        var account = accounts.find(function (num) {
          return num.accountNumber === parseInt(accountNum);
        });

        if (!account) {
          return res.status(400).json({
            status: 400,
            error: 'Account not found'
          });
        }

        if (account.openingBalance < req.body.amount) {
          return res.status(400).json({
            status: 400,
            error: 'Insuficient balance'
          });
        }

        var accountBalance = account.openingBalance - req.body.amount;
        var transaction = {
          transactionId: transactions.length + 1,
          accountNumber: accountNum,
          amount: req.body.amount,
          cashier: req.body.cashier,
          transactionType: 'debit',
          date: moment().format('LL'),
          time: moment().format('hh:mm'),
          accountBalance: String(accountBalance)
        };
        account.openingBalance = accountBalance;
        accounts.push(account);
        transactions.push(transaction);
        return res.status(200).json({
          status: 200,
          data: transaction
        });
      }
    }, {
      key: "creditAccount",
      value: function creditAccount(req, res) {
        var accountNum = parseInt(req.body.accountNumber);
        var account = accounts.find(function (num) {
          return num.accountNumber === parseInt(accountNum);
        });

        if (!account) {
          return res.status(400).json({
            status: 400,
            error: 'Account not found'
          });
        }

        var accountBalance = parseFloat(account.openingBalance) + parseFloat(req.body.amount);
        var transaction = {
          transactionId: transactions.length + 1,
          accountNumber: accountNum,
          amount: req.body.amount,
          cashier: req.body.cashier,
          transactionType: 'credit',
          date: moment().format('LL'),
          time: moment().format('hh:mm'),
          accountBalance: String(accountBalance)
        };
        account.openingBalance = accountBalance;
        accounts.push(account);
        transactions.push(transaction);
        return res.status(200).json({
          status: 200,
          data: transaction
        });
      }
    }]);

    return transactionController;
  }();

  return transactionController;
}

var _default = transactionContrl;
exports["default"] = _default;