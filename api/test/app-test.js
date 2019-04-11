import { expect } from 'chai';
import app from '../app';

describe('app', function () {
    it('should exist', function() {
        expect(app).to.not.be.undefined;
    });
});
