/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

function authMiddleware() {
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
            req.payload = payload;
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
          error: 'Error occurred',
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

          if (payload.type === 'client') { // work on nested routes to get this params
            req.payload = payload;
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

          if (payload.isAdmin === 'true') {
            req.payload = payload;
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

          if (payload.isAdmin === 'false' && payload.type === 'staff') {
            req.payload = payload;
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

          if (payload.type === 'staff') {
            req.payload = payload;
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

          if ((payload.type === 'client') || (payload.type === 'staff')) {
            req.payload = payload;
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
