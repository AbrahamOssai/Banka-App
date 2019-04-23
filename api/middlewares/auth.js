/* eslint-disable consistent-return */

function authMiddleware({ jwt, users }) {
  /**
   *
   * @exports
   * @class authMiddleware
   */
  class AuthMiddleware {
  /**
     * accountMiddleware
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    static isLoggedIn(req, res, next) {
      try {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (payload) {
            return next();
          }

          return res.status(401).json({
            status: 401,
            error: 'Please login first',
          });
        });
      } catch (e) {
        return res.status(401).json({
          status: 401,
          error: 'Please login first',
        });
      }
    }

    static isUser(req, res, next) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (!payload) {
            return res.status(401).json({
              status: 401,
              error: 'Please login first',
            });
          }

          if (payload.id === req.params.userId) { // work on nested routes to get this params
            return next();
          }

          return res.status(401).json({
            status: 401,
            error: 'Unauthorized access',
          });
        });
      } catch (e) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized access',
        });
      }
    }

    static isAdmin(req, res, next) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (!payload) {
            return res.status(401).json({
              status: 401,
              error: 'Please login first',
            });
          }

          const user = users.find(check => check.id === payload.id);

          if (user.isAdmin) {
            return next();
          }

          return res.status(401).json({
            status: 401,
            error: 'Unauthorized access',
          });
        });
      } catch (e) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized access',
        });
      }
    }

    static isStaff(req, res, next) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (!payload) {
            return res.status(401).json({
              status: 401,
              error: 'Please login first',
            });
          }

          const user = users.find(check => check.id === payload.id);

          if (!user.isAdmin && user.type === 'staff') {
            return next();
          }

          return res.status(401).json({
            status: 401,
            error: 'Unauthorized access',
          });
        });
      } catch (e) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized access',
        });
      }
    }

    static isAdminOrStaff(req, res, next) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (!payload) {
            return res.status(401).json({
              status: 401,
              error: 'Please login first',
            });
          }

          const user = users.find(check => check.id === payload.id);

          if (user.type === 'staff') {
            return next();
          }

          return res.status(401).json({
            status: 401,
            error: 'Unauthorized access',
          });
        });
      } catch (e) {
        return res.status(401).json({
          status: 401,
          error: 'Please login first',
        });
      }
    }

    static isUserAdminOrStaff(req, res, next) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (!payload) {
            return res.status(401).json({
              status: 401,
              error: 'Please login first',
            });
          }

          const user = users.find(check => check.id === payload.id);

          if ((payload.id === req.params.userId) || (user.type === 'staff')) {
            return next();
          }

          return res.status(401).json({
            status: 401,
            error: 'Unauthorized access',
          });
        });
      } catch (e) {
        return res.status(401).json({
          status: 401,
          error: 'Please login first',
        });
      }
    }
  }

  return AuthMiddleware;
}
export default authMiddleware;
