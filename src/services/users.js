import { UsersCollection } from '../db/models/User.js';

export const getAllUsers = async () => {
  const users = await UsersCollection.find({});
  return users;
};

export const getUserById = async (id) => {
  const user = await UsersCollection.findById(id);
  return user;
};

export const createUser = async (payload) => {
  const newUser = await UsersCollection.create(payload);
  return newUser;
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
