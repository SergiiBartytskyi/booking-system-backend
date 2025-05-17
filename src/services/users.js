import { UsersCollection } from '../db/models/User.js';

export const getAllUsers = async () => {
  const users = await UsersCollection.find();
  return users;
};

export const getUserById = async (id) => {
  const user = await UsersCollection.findById(id);
  return user;
};
