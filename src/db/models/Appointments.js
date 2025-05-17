import { Schema, model } from 'mongoose';
import { STATUS } from '../../constants/index.js';

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

export const AppointmentsCollection = model('appointments', appointmentSchema);
