import createHttpError from 'http-errors';

import { findSession, findUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  // const authHeader = req.get('Authorization');

  // if (!authHeader) {
  //   return next(createHttpError(401, 'Please provide Authorization header!'));
  // }

  // const [bearer, token] = authHeader.split(' ');

  // if (bearer !== 'Bearer' || !token) {
  //   return next(createHttpError(401, 'Auth header should be of type Bearer!'));
  // }
  // const session = await findSession({ accessToken: token });

  // if (Date.now() > session.accessTokenValidUntil) {
  //   return next(createHttpError(401, 'Access token expired!'));
  // }

  const { sessionId } = req.cookies;
  if (!sessionId) return next(createHttpError(401, 'Unauthorized'));
  const session = await findSession({ _id: sessionId });
  if (!session) {
    return next(createHttpError(401, 'Session not found!'));
  }
  if (!session || session.refreshTokenValidUntil < new Date()) {
    return next(createHttpError(401, 'Session expired'));
  }

  const user = await findUser({ _id: session.userId });

  if (!user) {
    return next(createHttpError(401, 'User not found!'));
  }

  req.user = user;

  next();
};
