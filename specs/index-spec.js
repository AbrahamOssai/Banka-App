/*eslint-env mocha*/
var expect = require('chai').expect;

const index = require('../index');

describe('index', function() {
    it('should exist', function() {
        expect(index).to.not.be.undefined;
    });
});