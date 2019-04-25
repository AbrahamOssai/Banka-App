/* eslint-disable consistent-return */

function authHelp({ jwt }) {
  /**
   *
   * @exports
   * @class authMiddleware
   */
  class AuthHelp {
  /**
     * accountMiddleware
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    static isLoggedIn(req) {
      try {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (payload) {
            return true;
          }

          return false;
        });
      } catch (e) {
        return false;
      }
    }

    static isUser(req) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (!payload) {
            return false;
          }

          if (payload.type === 'client') {
            return true;
          }

          return false;
        });
      } catch (e) {
        return false;
      }
    }

    static isAdmin(req) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (!payload) {
            return false;
          }

          if (payload.isAdmin) {
            return true;
          }

          return false;
        });
      } catch (e) {
        return false;
      }
    }

    static isStaff(req) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (!payload) {
            return false;
          }

          if (!payload.isAdmin && payload.type === 'staff') {
            return true;
          }

          return false;
        });
      } catch (e) {
        return false;
      }
    }

    static isAdminOrStaff(req) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (!payload) {
            return false;
          }

          if (payload.type === 'staff') {
            return true;
          }

          return false;
        });
      } catch (e) {
        return false;
      }
    }

    static isUserAdminOrStaff(req) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET, (error, payload) => {
          if (!payload) {
            return false;
          }

          if ((payload.id === 'client') || (payload.type === 'staff')) {
            return true;
          }

          return false;
        });
      } catch (e) {
        return false;
      }
    }
  }

  return AuthHelp;
}
export default authHelp;
