/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import { expect } from 'chai';
import User from '../../models/user';

describe('User Model', () => {
  const input = {
    firstName: 'Ifeanyi',
    lastName: 'Ossai',
    email: 'abraham.ossai.com',
    type: 'staff',
    isAdmin: true,
  };
  const user = new User(input);

  it('Should exist', () => {
    expect(user).to.not.be.undefined;
  });

  describe('new User()', () => {
    it('Should be a class', () => {
      expect(user).to.be.an.instanceof(Object);
    });

    it('user.firstName should equal input.firstName', () => {
      expect(user.firstName).to.equal(input.firstName);
    });
  });

  describe('#getId()', () => {
    it('It should return a null ID', () => {
      const actual = user.getId();
      const expected = null;

      expect(actual).to.equal(expected);
    });
  });

  describe('#setId()', () => {
    it('It should take a number input and #getId() should retrieve the number', () => {
      const input = 37;

      user.setId(input);
      const actual = user.getId();
      const expected = input;

      expect(actual).to.equal(expected);
    });
  });
});
