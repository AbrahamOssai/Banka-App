"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = exports.transactions = exports.accounts = void 0;
var accounts = [{
  id: 1,
  accountNumber: 8596321547,
  createdOn: 'March 11, 2019',
  firstName: 'Ifeanyi',
  lastName: 'Ossai',
  email: 'abraham.ossai@gmail.com',
  openingBalance: '263452.30',
  status: 'active'
}];
exports.accounts = accounts;
var transactions = [{
  transactionId: 1,
  accountNumber: '8596321547',
  amount: '0',
  cashier: '1',
  transactionType: 'debit',
  date: 'March 10, 2019',
  time: '07:50',
  accountBalance: '5678909.33'
}];
exports.transactions = transactions;
var users = [{
  id: 1,
  firstName: 'Ifeanyi',
  lastName: 'Ossai',
  email: 'abraham.ossai@gmail.com',
  password: '$2a$10$A94J5PAjyvXTZbq7l2ddu.AY5VCV3NqexODRIoqqJi7YqZUxKbyM6'
}];
exports.users = users;