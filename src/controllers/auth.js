import createHttpError from 'http-errors';
import * as authServices from '../services/auth.js';

const setupSession = (res, session) => {
  const { _id, refreshToken, refreshTokenValidUntil } = session;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
    sameSite: 'Lax',
    secure: false,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
    sameSite: 'Lax',
    secure: false,
  });
};

export const registerUserController = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return next(
      createHttpError(400, 'Required fields: name, email, password, role'),
    );
  }

  const { newUser, session } = await authServices.registerUser({
    name,
    email,
    password,
    role,
  });

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a user!',
    data: {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    },
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const { user, session } = await authServices.loginUser({
    email,
    password,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'User successfully logged in!',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authServices.logout(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
