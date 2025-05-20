import { AppointmentsCollection } from '../db/models/Appointment.js';

export const createAppointment = async (payload) => {
  const newAppointment = await AppointmentsCollection.create(payload);
  return newAppointment;
};

export const updateAppointment = async (appointmentId, payload) => {
  const editAppointment = await AppointmentsCollection.findOneAndUpdate(
    { _id: appointmentId },
    payload,
    { new: true },
  );

  return editAppointment;
};

export const deleteAppointment = async (appointmentId, clientId) => {
  const appointment = await AppointmentsCollection.findByIdAndDelete({
    _id: appointmentId,
    clientId,
  });
  return appointment;
};
