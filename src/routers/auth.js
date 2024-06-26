import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  sendResetEmailSchema,
} from '../validation/schemas/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  registerUserContoller,
  resetPasswordController,
  sendResetEmailController,
} from '../controllers/auth.js';
import authenticate from '../middlewares/authenticate.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserContoller),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post(
  '/refresh',
  authenticate,
  ctrlWrapper(refreshUsersSessionController),
);

authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));

authRouter.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;