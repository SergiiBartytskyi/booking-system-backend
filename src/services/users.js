import { ROLES } from '../constants/index.js';
import { UsersCollection } from '../db/models/User.js';

export const getBusinessUsers = async () => {
  const users = await UsersCollection.find()
    .where('role')
    .equals(ROLES.BUSINESS);
  return users;
};

export const getUserById = async (id) => {
  const user = await UsersCollection.findOne({
    _id: id,
    role: ROLES.BUSINESS,
  });
  return user;
};

export const deleteUser = async (id) => {
  const user = await UsersCollection.findOneAndDelete({ _id: id });
  return user;
};

export const updateUser = async (id, payload, options = {}) => {
  const rawResult = await UsersCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    user: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
