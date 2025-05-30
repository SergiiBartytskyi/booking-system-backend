import createHttpError from 'http-errors';
import * as usersServices from '../services/users.js';
import * as appointmentsServices from '../services/appointments.js';
import { ROLES } from '../constants/index.js';

export const getUsersController = async (req, res, next) => {
  const user = req.user;
  const isClient = user.role === ROLES.CLIENT;
  if (!isClient) {
    return next(
      createHttpError(
        403,
        'Access denied. You do not have permission to access this resource.!',
      ),
    );
  }
  const users = await usersServices.getBusinessUsers();

  res.json({
    status: 200,
    message: 'Successfully found business users!',
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

export const currentUserController = async (req, res) => {
  const user = req.user;

  res.json({
    status: 200,
    message: 'User successfully refreshed!',
    data: user,
  });
};

export const deleteUserController = async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id.toString();
  const userRole = req.user.role;

  if (userId !== id) {
    return next(createHttpError(403, 'Access denied'));
  }

  await appointmentsServices.deleteAppointmentsByUserId({ id, userRole });

  const user = await usersServices.deleteUser(id);

  if (!user) {
    return next(createHttpError(404, 'User not found!'));
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const upsertUserController = async (req, res, next) => {
  const { id } = req.params;
  const userRole = req.user.role;
  const { name } = req.body;

  const userId = req.user._id.toString();

  if (userId !== id) {
    return next(createHttpError(403, 'Access denied'));
  }

  const result = await usersServices.updateUser(id, req.body, {
    upsert: true,
  });

  if (!result) {
    return next(createHttpError(404, 'User not found!'));
  }

  await appointmentsServices.updateAppointmentsByUserName({
    id,
    name,
    userRole,
  });

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a user!`,
    data: result.user,
  });
};

export const patchUserController = async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id.toString();

  if (userId !== id) {
    return next(createHttpError(403, 'Access denied'));
  }

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
