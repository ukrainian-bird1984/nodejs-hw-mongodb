import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/models/User.js';
import { SessionsCollection } from '../db/models/Session.js';
import generateTokens from '../utils/generateTokens.js';
import sendMail from '../utils/sendMail.js';
import env from '../utils/env.js';
import { ENV_VARS } from '../constants/envVars.js';

export async function registerUser(payload) {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });
}

export async function loginUser(payload) {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });

  if (!user) {
    throw createHttpError(401, 'Wrong email or password!');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.deleteOne({ userId: user._id });

  return await SessionsCollection.create({
    userId: user._id,
    ...generateTokens(),
  });
}

export async function refreshUserSession(refreshToken) {
  const session = await SessionsCollection.findOne({
    refreshToken,
  });
  if (!session) throw createHttpError(404, 'Session not found!');

  if (session.refreshTokenValidUntil < Date.now()) {
    throw createHttpError(401, 'Refresh token is expired!');
  }

  await SessionsCollection.deleteOne({ userId: session.userId });

  return await SessionsCollection.create({
    userId: session.userId,
    ...generateTokens(),
  });
}

export async function logoutUser(refreshToken) {
  return await SessionsCollection.deleteOne({ refreshToken });
}

export async function sendResetEmail(email) {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const token = jwt.sign({ sub: user._id, email }, env(ENV_VARS.JWT_SECRET), {
    expiresIn: '5m',
  });

  try {
    await sendMail({
      from: env(ENV_VARS.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${env(
        ENV_VARS.APP_DOMAIN,
      )}/auth/reset-password?token=${token}
">here</a> to reset your password!</p>`,
    });
  } catch (error) {
    console.log(error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
}

export async function resetPassword(payload) {
  let entries;

  try {
    entries = jwt.verify(payload.token, env(ENV_VARS.JWT_SECRET));
  } catch (error) {
    if (error instanceof Error) {
      throw createHttpError(401, error.message);
    }
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const user = await UsersCollection.findOne({
    _id: entries.sub,
    email: entries.email,
  });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const newPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne({ _id: user._id }, { password: newPassword });

  await SessionsCollection.findOneAndDelete({ userId: user._id });
}