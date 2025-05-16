import { Schema, model } from 'mongoose';
import { ROLES } from '../../constants/index.js';
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [ROLES.CLIENT, ROLES.BUSINESS],
    default: ROLES.CLIENT,
  },
});

export const UsersCollection = model('users', userSchema);
