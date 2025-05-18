import createHttpError from 'http-errors';
import * as appointmentsServices from '../services/appointments.js';

export const createAppointmentController = async (req, res, next) => {
  const { id: businessId, status, dateTime } = req.body;

  if (!businessId || !dateTime) {
    return next(createHttpError(400, 'Required fields: id, dateTime!'));
  }

  const newAppointment = await appointmentsServices.createAppointment({
    // clientId,
    businessId,
    status,
    dateTime,
  });
};
