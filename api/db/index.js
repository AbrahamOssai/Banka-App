import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createAccountTable = () => {
  pool.connect((err, client, done) => {
    const accountTable = `CREATE TABLE IF NOT EXISTS
      accounts(
        id SERIAL PRIMARY KEY,
        account_number VARCHAR(128) NOT NULL,
        created_on VARCHAR(128) NOT NULL,
        owner VARCHAR(128) NOT NULL,
        type VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        balance VARCHAR(128) NOT NULL
      )`;

    client.query(accountTable)
      .then((res) => {
        done();
        console.log(res);
      })
      .catch((error) => {
        done();
        console.log(error);
      });
  });
};

const createUserTable = () => {
  pool.connect((err, client, done) => {
    const userTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) NOT NULL,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        isadmin VARCHAR(128) NOT NULL,
        type VARCHAR(128) NOT NULL
      )`;

    client.query(userTable)
      .then((res) => {
        done();
        console.log(res);
        pool.end();
      })
      .catch((error) => {
        done();
        console.log(error);
      });
  });
};

const createTransactionTable = () => {
  pool.connect((err, client, done) => {
    const transactionTable = `CREATE TABLE IF NOT EXISTS
      transactions(
        id SERIAL PRIMARY KEY,
        createdon VARCHAR(128) NOT NULL,
        type VARCHAR(128) NOT NULL,
        accountnumber VARCHAR(128) NOT NULL,
        cashier VARCHAR(128) NOT NULL,
        amount VARCHAR(128) NOT NULL,
        oldbalance VARCHAR(128) NOT NULL,
        newbalance VARCHAR(128) NOT NULL
      )`;

    client.query(transactionTable)
      .then((res) => {
        done();
        console.log(res);
      })
      .catch((error) => {
        done();
        console.log(error);
      });
  });
};

function query(text, values) {
  return new Promise((resolve, reject) => {
    pool.query(text, values, (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res);
    });
  });
}

/**
 * Drop Tables
 */
const dropTables = (table) => {
  const queryText = `DROP TABLE IF EXISTS ${table}`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
});

export default {
  createUserTable,
  createAccountTable,
  createTransactionTable,
  dropTables,
  query,
};

require('make-runnable');
