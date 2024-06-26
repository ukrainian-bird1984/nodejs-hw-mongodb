import { ONE_DAY } from '../constants/index.js';

export default function setupCookies(res, session) {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
}