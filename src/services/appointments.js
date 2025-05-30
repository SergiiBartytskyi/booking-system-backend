import { ROLES } from '../constants/index.js';
import { AppointmentsCollection } from '../db/models/Appointment.js';

export const getAppointments = async ({ userId, userRole }) => {
  const appointments =
    userRole === ROLES.CLIENT
      ? await AppointmentsCollection.find({ clientId: userId })
      : await AppointmentsCollection.find({ businessId: userId });
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

export const updateAppointmentsByUserName = async ({ id, name, userRole }) => {
  const editAppointments =
    userRole === ROLES.CLIENT
      ? await AppointmentsCollection.updateMany(
          { clientId: id },
          { $set: { clientName: name } },
        )
      : await AppointmentsCollection.updateMany(
          { businessId: id },
          { $set: { businessName: name } },
        );

  return editAppointments;
};

export const deleteAppointment = async (appointmentId, businessId) => {
  const appointment = await AppointmentsCollection.findOneAndDelete({
    _id: appointmentId,
    businessId,
  });
  return appointment;
};

export const deleteAppointmentsByUserId = async ({ id, userRole }) => {
  const appointmentsById =
    userRole === ROLES.CLIENT
      ? await AppointmentsCollection.deleteMany({ clientId: id })
      : await AppointmentsCollection.deleteMany({ businessId: id });
  return appointmentsById;
};
