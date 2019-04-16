"use strict";

var _chai = require("chai");

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('app', function () {
  it('should exist', function () {
    (0, _chai.expect)(_["default"]).to.not.be.undefined;
  });
});