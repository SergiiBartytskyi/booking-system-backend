import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersCollection } from '../db/models/User.js';
import { SessionsCollection } from '../db/models/Session.js';
import createHttpError from 'http-errors';
import { ONE_DAY } from '../constants/index.js';

const createSession = () => {
  const refreshToken = randomBytes(30).toString('base64');

  return {
    refreshToken,
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const findSession = (filter) => SessionsCollection.findOne(filter);

export const findUser = (filter) => UsersCollection.findOne(filter);

export const registerUser = async (payload) => {
  const user = await findUser({ email: payload.email });

  if (user) throw createHttpError(409, 'Email in use!');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  const newSession = createSession();

  const session = await SessionsCollection.create({
    userId: newUser._id,
    ...newSession,
  });

  return {
    newUser,
    session,
  };
};

export const loginUser = async (payload) => {
  const user = await findUser({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'Email or password invalid!');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Email or password invalid!');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  const session = await SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });

  return {
    user,
    session,
  };
};

export const logout = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
