import createHttpError from 'http-errors';
import * as usersServices from '../services/users.js';

export const getUsersController = async (req, res) => {
  const users = await usersServices.getAllUsers();

  res.json({
    status: 200,
    message: 'Successfully found users!',
    data: users,
  });
};

export const getUserByIdController = async (req, res, next) => {
  const { id } = req.params;
  const user = await usersServices.getUserById(id);

  if (!user) {
    return next(createHttpError(404, 'User not found!'));
  }

  res.json({
    status: 200,
    message: `Successfully found user with id ${id}!`,
    data: user,
  });
};

export const createUserController = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return next(
      createHttpError(400, 'Required fields: name, email, password, role'),
    );
  }

  const newUser = await usersServices.createUser({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a user!',
    data: newUser,
  });
};

export const deleteUserController = async (req, res, next) => {
  const { id } = req.params;

  const user = await usersServices.deleteUser(id);

  if (!user) {
    return next(createHttpError(404, 'User not found!'));
  }

  res.status(204).send();
};

export const upsertUserController = async (req, res, next) => {
  const { id } = req.params;

  const result = await usersServices.updateUser(id, req.body, {
    upsert: true,
  });

  if (!result) {
    return next(createHttpError(404, 'User not found!'));
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a user!`,
    data: result.user,
  });
};

export const patchUserController = async (req, res, next) => {
  const { id } = req.params;

  const result = await usersServices.updateUser(id, req.body);

  if (!result) {
    return next(createHttpError(404, 'User not found!'));
  }

  res.json({
    status: 200,
    message: `Successfully patched a user!`,
    data: result.user,
  });
};
