import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  resetPassword,
  sendResetEmail,
} from '../services/auth.js';

import setupCookies from '../utils/setupCookies.js';

export async function registerUserContoller(req, res) {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
}

export async function loginUserController(req, res) {
  const session = await loginUser(req.body);

  setupCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function refreshUsersSessionController(req, res) {
  const session = await refreshUserSession(req.cookies.refreshToken);

  setupCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function logoutUserController(req, res) {
  if (req.cookies.refreshToken) {
    await logoutUser(req.cookies.refreshToken);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
}

export async function sendResetEmailController(req, res) {
  await sendResetEmail(req.body.email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
}

export async function resetPasswordController(req, res) {
  await resetPassword(req.body);

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
}