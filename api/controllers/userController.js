/* eslint-disable consistent-return */
import db from '../db';

function userContrl({ jwt, bcrypt }) {
  /**
   * @exports
   * @class UserController
   */

  class UserController {
    static async registerUser(req, res) {
      try {
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);

        const user = rows[0];

        if (user) {
          return res.status(400).json({
            status: 409,
            error: 'User already exist',
          });
        }
      } catch (err) {
        res.status(400).json({
          status: 400,
          error: 'Error in connection, please try again',
        });
      }

      const query = 'INSERT INTO users(email, firstname, lastname, password, isadmin, type ) VALUES($1,$2,$3,$4,$5,$6) returning *';
      const values = [
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        bcrypt.hashSync(req.body.password),
        req.body.isAdmin || false,
        req.body.type,
      ];

      try {
        const { rows } = await db.query(query, values);

        const {
          email, id, type, firstname, lastname, isadmin,
        } = rows[0];

        const payload = {
          email, type, id, firstname, lastname, isadmin,
        };

        const token = jwt.sign(payload, process.env.MY_SECRET, {
          expiresIn: '24h',
        });

        res.header('Authorization', token).status(201);
        res.json({
          status: 201,
          message: 'Registration successful',
          data: {
            token,
            id,
            firstname,
            lastname,
            email,
            type,
            isadmin,
          },
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          error: 'Error in connection, please try again',
        });
      }
    }

    static async loginUser(req, res) {
      try {
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);

        const user = rows[0];

        if (!user) {
          return res.status(400).json({
            status: 409,
            error: 'User does not exist, please register',
          });
        }

        const check = bcrypt.compareSync(req.body.password, user.password);

        if (!check) {
          return res.status(400).json({
            status: 400,
            error: 'Incorrect password',
          });
        }

        // Generate token
        const payload = {
          id: user.id,
          type: user.type,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          isadmin: user.isadmin,
        };

        const token = jwt.sign(payload, process.env.MY_SECRET, { expiresIn: '24h' });
        
        res.json({
          status: 200,
          message: 'Login successful',
          data: {
            token,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isadmin: user.isadmin,
            type: user.type,
          },
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          error: 'Error in connection, please try again',
        });
      }
    }
  }

  return UserController;
}

export default userContrl;
