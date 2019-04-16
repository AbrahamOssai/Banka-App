"use strict";

var _chai = require("chai");

var _user = _interopRequireDefault(require("../../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-expressions */

/* eslint-disable no-undef */

/* eslint-disable no-shadow */
describe('User Model', function () {
  var input = {
    firstName: 'Ifeanyi',
    lastName: 'Ossai',
    email: 'abraham.ossai.com',
    type: 'staff',
    isAdmin: true
  };
  var user = new _user["default"](input);
  it('Should exist', function () {
    (0, _chai.expect)(user).to.not.be.undefined;
  });
  describe('new User()', function () {
    it('Should be a class', function () {
      (0, _chai.expect)(user).to.be.an["instanceof"](Object);
    });
    it('user.firstName should equal input.firstName', function () {
      (0, _chai.expect)(user.firstName).to.equal(input.firstName);
    });
  });
  describe('#getId()', function () {
    it('It should return a null ID', function () {
      var actual = user.getId();
      var expected = null;
      (0, _chai.expect)(actual).to.equal(expected);
    });
  });
  describe('#setId()', function () {
    it('It should take a number input and #getId() should retrieve the number', function () {
      var input = 37;
      user.setId(input);
      var actual = user.getId();
      var expected = input;
      (0, _chai.expect)(actual).to.equal(expected);
    });
  });
});