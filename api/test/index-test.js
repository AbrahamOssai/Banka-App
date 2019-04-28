import '@babel/polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import faker from 'faker';


chai.use(chaiHttp);
chai.should();

describe('app', () => {
  it('should exist', (done) => {
    expect(app).to.not.be.undefined;
    done();
  });
});

describe('UNIT TESTS FOR CONTROLLERS', () => {
  describe('/GET REQUEST', () => {
    it('it should GET route', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/POST REQUEST Sign up', () => {
    it('it should sign up user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          password: 'andela123',
          type: 'client',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Registration successful');
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('it should fail user sign up, account exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'James',
          lastName: 'Anderson',
          email: 'james@anderson.com',
          password: 'james123',
          type: 'client',
          isAdmin: 'false',
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('error').to.equals('User already exist');
          res.body.should.have.property('status').to.equals(409);
          done();
        });
    });

    it('it should fail user sign up for empty fields', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').to.equals('Please fill all fields');
          res.body.should.have.property('status').to.equals(400);
          done();
        });
    });

    it('it should fail POST user sign up for missing fields', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '',
          lastName: 'Anderson',
          email: 'james@anderson.com',
          password: 'james',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/POST REQUEST login', () => {
    it('it should successfully login user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'james@anderson.com',
          password: 'james123',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Login successful');
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('it should fail user login for incorrect email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'wrong@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').to.equals('User does not exist, please register');
          res.body.should.have.property('status').to.equals(400);
          done();
        });
    });

    it('it should fail user login for wrong password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'abraham.ossai@gmail.com',
          password: 'wrong123',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').to.equals('Incorrect password');
          res.body.should.have.property('status').to.equals(400);
          done();
        });
    });

    it('it should fail user login for empty fields', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').to.equals('Please fill all fields');
          res.body.should.have.property('status').to.equals(400);
          done();
        });
    });

    it('it should fail user sign in for empty email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: 'james',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/POST REQUEST Create Account', () => {
    let userToken;

    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'abraham.ossai@gmail.com',
          password: 'andela1234',
        })
        .end((err, res) => {
          const { token } = res.body.data;
          userToken = `Bearer ${token}`;
          done();
        });
    });

    it('it should successfully create account', (done) => {
      chai
        .request(app)
        .post('/api/v1/accounts')
        .set('Authorization', userToken)
        .send({
          email: 'abraham.ossai@gmail.com',
          type: 'current',
          openingBalance: 50000,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').to.equals('Account created');
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data');
          done();
        });
    });

    it('it should fail POST to create user account', (done) => {
      chai
        .request(app)
        .post('/api/v1/accounts')
        .set('Authorization', userToken)
        .send({
          email: 'wrong@gmail.com',
          type: 'current',
          openingBalance: 50000,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have.property('error').to.equals('sign up before creating account');
          done();
        });
    });
  });

  describe('/PATCH REQUEST Activate/Deactivate account', () => {
    let adminToken;

    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'abraham@foo.com',
          password: 'andela1234',
        })
        .end((err, res) => {
          const { token } = res.body.data;
          adminToken = `Bearer ${token}`;
          done();
        });
    });

    it('it should PATCH user account', (done) => {
      chai
        .request(app)
        .patch('/api/v1/accounts/3657878777')
        .set('Authorization', adminToken)
        .send({
          status: 'active',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Successfully updated Account');
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('it should fail PATCH user account', (done) => {
      chai
        .request(app)
        .patch('/api/v1/accounts/1767637187')
        .set('Authorization', adminToken)
        .send({
          status: 'dormant',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have.property('error').to.equals('Account not found');
          done();
        });
    });
  });

  describe('/POST REQUEST Credit Transaction', () => {
    let staffToken;

    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'cashier@cashier.com',
          password: 'andela123',
        })
        .end((err, res) => {
          const { token } = res.body.data;
          staffToken = `Bearer ${token}`;
          done();
        });
    });

    it('it should credit an account ', (done) => {
      const accountNumber = 3657878777;
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('Authorization', staffToken)
        .send({
          amount: 33200,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data').to.be.an('object');
          done();
        });
    });

    it('it should fail to create credit transaction on an account ', (done) => {
      chai
        .request(app)
        .post('/api/v1/transactions/2853393061/credit')
        .set('Authorization', staffToken)
        .send({
          amount: 10200,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have.property('error').to.equals('Account not found');
          done();
        });
    });

    it('it should fail to credit an account with empty fields sent', (done) => {
      const accountNumber = 3657878777;

      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('Authorization', staffToken)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').to.equals('Please fill all fields');
          res.body.should.have.property('status').to.equals(400);
          done();
        });
    });
  });

  describe('/POST REQUEST Debit transactions', () => {
    let staffToken;

    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'cashier@cashier.com',
          password: 'andela123',
        })
        .end((err, res) => {
          const { token } = res.body.data;
          staffToken = `Bearer ${token}`;
          done();
        });
    });

    it('it should debit an account ', (done) => {
      const accountNumber = 3657878777;
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('Authorization', staffToken)
        .send({
          amount: 5000,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data').to.be.an('object');
          done();
        });
    });

    it('it should fail to debit an account for wrong account', (done) => {
      chai
        .request(app)
        .post('/api/v1/transactions/2349528533/debit')
        .set('Authorization', staffToken)
        .send({
          amount: 5200,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have.property('error').to.equals('Account not found');
          done();
        });
    });

    it('it should return issufficient balance ', () => {
      chai
        .request(app)
        .post('/api/v1/transactions/3657878777/debit')
        .set('Authorization', staffToken)
        .send({
          amount: 132002920,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);
          res.body.should.have.property('error').to.equals('Insuficient balance');
        });
    });

    it('it should fail to debit an account', (done) => {
      chai
        .request(app)
        .post('/api/v1/transactions/4952853906/debit')
        .set('Authorization', staffToken)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').to.equals('Please fill all fields');
          res.body.should.have.property('status').to.equals(400);
          done();
        });
    });
  });

  // describe('/GET REQUEST', () => {
  //   it('it should get accounts ', () => {
  //     chai.request(app)
  //       .get('/api/v1/accounts')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have.property('status').to.equals(200);
  //         res.body.should.have.property('message').to.equals('List of accounts');
  //         res.body.should.have.property('data').to.be.an('array');
  //       });
  //   });

  //   it('it should get accounts ', () => {
  //     chai.request(app)
  //       .get('/api/v1/accounts/4952853906')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have.property('status').to.equals(200);
  //         res.body.should.have.property('data').to.be.an('object');
  //       });
  //   });

  //   it('it should get accounts ', () => {
  //     chai.request(app)
  //       .get('/api/v1/accounts/4952853786')
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         res.body.should.have.property('status').to.equals(400);
  //         res.body.should.have.property('error').to.equals('Account not found');
  //       });
  //   });
  // });

  // describe('DELETE REQUEST', () => {
  //   it('it should DELETE account', () => {
  //     chai.request(app)
  //       .delete('/api/v1/accounts/4952853906')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have.property('message').to.equals('Account deleted');
  //         res.body.should.have.property('status').to.equals(200);
  //       });
  //   });

  //   it('it should return error', () => {
  //     chai.request(app)
  //       .delete('/api/v1/accounts/2345566767')
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         res.body.should.have.property('error').to.equals('Account not found');
  //         res.body.should.have.property('status').to.equals(400);
  //       });
  //   });n
  // });
});
