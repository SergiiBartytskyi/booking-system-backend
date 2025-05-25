import { Schema, model } from 'mongoose';
import { STATUS } from '../../constants/index.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const appointmentSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    businessName: {
      type: String,
      ref: 'users',
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [STATUS.SCHEDULED, STATUS.CANCELLED, STATUS.COMPLETED],
      default: STATUS.SCHEDULED,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

appointmentSchema.post('save', handleSaveError);

appointmentSchema.pre('findOneAndUpdate', setUpdateSettings);

appointmentSchema.post('findOneAndUpdate', handleSaveError);

export const AppointmentsCollection = model('appointments', appointmentSchema);
