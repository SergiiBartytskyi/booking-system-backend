import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createAppointmentController,
  deleteAppointmentController,
  editAppointmentController,
  getAppointmentByIdController,
  getAppointmentsController,
} from '../controllers/appointments.js';

const router = Router();

router.use(authenticate);

router.get('/me', ctrlWrapper(getAppointmentsController));
router.get('/:id', isValidId, ctrlWrapper(getAppointmentByIdController));
router.post('/:id', isValidId, ctrlWrapper(createAppointmentController));
router.patch('/:id', isValidId, ctrlWrapper(editAppointmentController));
router.delete('/:id', isValidId, ctrlWrapper(deleteAppointmentController));

export default router;
