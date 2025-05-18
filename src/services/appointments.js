import { AppointmentsCollection } from '../db/models/Appointment.js';

export const createAppointment = async (payload) => {
  const newAppointment = await AppointmentsCollection.create(payload);
  return newAppointment;
};
