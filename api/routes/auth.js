import express from 'express';

const router = express.Router();

function authRoutes({ UserController, UserMiddleware }) {
  const { validateLogin, validateSignup } = UserMiddleware;
  const { loginUser, registerUser } = UserController;

  router.post('/signup', validateSignup, registerUser);
  router.post('/signin', validateLogin, loginUser);

  return router;
}

export default authRoutes;