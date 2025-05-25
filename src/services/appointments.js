import { AppointmentsCollection } from '../db/models/Appointment.js';

export const getAppointments = async (userId) => {
  const appointments = await AppointmentsCollection.find({ clientId: userId });
  return appointments;
};

export const getAppointmentById = async (id) => {
  const appointment = await AppointmentsCollection.findOne({
    _id: id,
  });
  return appointment;
};

export const createAppointment = async (payload) => {
  const newAppointment = await AppointmentsCollection.create(payload);
  return newAppointment;
};

export const updateAppointment = async (appointmentId, clientId, payload) => {
  const editAppointment = await AppointmentsCollection.findOneAndUpdate(
    { _id: appointmentId, clientId },
    payload,
    { new: true },
  );

  return editAppointment;
};

export const deleteAppointment = async (appointmentId, clientId) => {
  const appointment = await AppointmentsCollection.findOneAndDelete({
    _id: appointmentId,
    clientId,
  });
  return appointment;
};
