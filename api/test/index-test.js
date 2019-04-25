import "@babel/polyfill";
import { expect } from 'chai';

import app from '..';

describe('app', () => {
    it('should exist', () => {
        expect(app).to.not.be.undefined;
    });
});
