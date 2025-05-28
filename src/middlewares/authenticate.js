import createHttpError from 'http-errors';

import { findSession, findUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
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
