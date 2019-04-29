import express from 'express';

const router = express.Router();

function authRoutes({ UserController, UserMiddleware }) {
  const { validateLogin, validateSignup } = UserMiddleware;
  const { loginUser, registerUser } = UserController;

  /**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - auth
 *     description: Creates a new user accounts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Account successfully created
 *         schema:
 *           $ref: '#/definitions/auth'
 */
  router.post('/signup', validateSignup, registerUser);

  /**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - auth
 *     description: Logs in a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully logged-in
 *         schema:
 *           $ref: '#/definitions/auth'
 */
  router.post('/signin', validateLogin, loginUser);

  return router;
}

export default authRoutes;
