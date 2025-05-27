import createHttpError from 'http-errors';
import * as appointmentsServices from '../services/appointments.js';
import { ROLES, STATUS } from '../constants/index.js';

export const getAppointmentsController = async (req, res) => {
  const userId = req.user._id.toString();
  const userRole = req.user.role;

  const appointments = await appointmentsServices.getAppointments({
    userId,
    userRole,
  });

  res.json({
    status: 200,
    message: 'Successfully found user appointments!',
    data: appointments,
  });
};

export const getAppointmentByIdController = async (req, res, next) => {
  const { id } = req.params;
  const appointment = await appointmentsServices.getAppointmentById(id);

  if (!appointment) {
    return next(createHttpError(404, 'Appointment not found!'));
  }

  res.json({
    status: 200,
    message: `Successfully found appointment with id ${id}!`,
    data: appointment,
  });
};

export const createAppointmentController = async (req, res, next) => {
  const clientId = req.user._id.toString();
  const clientName = req.user.name.toString();
  const { dateTime, businessName, businessId } = req.body;
  const status = STATUS.SCHEDULED;

  if (req.user.role !== ROLES.CLIENT) {
    return next(createHttpError(403, 'Only clients can create appointments!'));
  }

  if (!dateTime) {
    return next(createHttpError(400, 'Required field:  dateTime!'));
  }

  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    return next(createHttpError(400, 'Invalid date format! Use ISO 8601.'));
  }

  const newAppointment = await appointmentsServices.createAppointment({
    clientId,
    clientName,
    businessId,
    businessName,
    dateTime: date,
    status,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully add appointment!',
    data: newAppointment,
  });
};

export const editAppointmentController = async (req, res, next) => {
  const clientId = req.user._id.toString();
  const { id: appointmentId } = req.params;
  const { status, dateTime } = req.body;

  if (!status && !dateTime) {
    return next(
      createHttpError(
        400,
        'At least one field required for update: status or dateTime',
      ),
    );
  }

  const updatePayload = {};

  if (status) {
    const validStatuses = [
      STATUS.SCHEDULED,
      STATUS.CANCELLED,
      STATUS.COMPLETED,
    ];

    if (!validStatuses.includes(status)) {
      return next(createHttpError(400, 'Invalid status value'));
    }

    updatePayload.status = status;
  }

  if (dateTime) {
    const date = new Date(dateTime);

    if (isNaN(date.getTime())) {
      return next(createHttpError(400, 'Invalid date format! Use ISO 8601.'));
    }

    updatePayload.dateTime = date;
  }

  const updatedAppointment = await appointmentsServices.updateAppointment(
    appointmentId,
    clientId,
    updatePayload,
  );

  if (!updatedAppointment) {
    return next(createHttpError(404, 'Appointment not found!'));
  }

  res.json({
    status: 200,
    message: 'Successfully update appointment!',
    data: updatedAppointment,
  });
};

export const deleteAppointmentController = async (req, res, next) => {
  const clientId = req.user._id.toString();
  const { id: appointmentId } = req.params;

  const deletedAppointment = await appointmentsServices.deleteAppointment(
    appointmentId,
    clientId,
  );

  if (!deletedAppointment) {
    return next(
      createHttpError(
        404,
        'Appointment not found or you do not have permission to delete it',
      ),
    );
  }

  res.status(204).send();
};
