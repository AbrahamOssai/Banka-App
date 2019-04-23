/* eslint-disable consistent-return */

function userContrl({ users, jwt, bcrypt }) {
  /**
   * @exports
   * @class UserController
   */

  class UserController {
    static registerUser(req, res) {
      const user = users.find(check => check.email === req.body.email);
      if (user) {
        return res.status(400).json({
          status: 409,
          error: 'User already exist',
        });
      }

      const newUser = {
        id: users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        type: req.body.type,
        isAdmin: req.body.isAdmin || false,
        password: bcrypt.hashSync(req.body.password),
      };
      users.push(newUser);

      const {
        email, id, type, firstName, lastName,
      } = newUser;

      const payload = {
        email, type, id,
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
          firstName,
          lastName,
          email,
          type,
        },
      });
    }

    static loginUser(req, res) {
      const user = users.find(check => check.email === req.body.email);
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
      };
      const token = jwt.sign(payload, 'privatekey', {
        expiresIn: '24h',
      });
      res.json({
        status: 200,
        message: 'Login successful',
        data: {
          token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    }
  }

  return UserController;
}

export default userContrl;
