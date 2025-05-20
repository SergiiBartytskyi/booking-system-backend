import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createAppointmentController,
  deleteAppointmentController,
  editAppointmentController,
} from '../controllers/appointments.js';

const router = Router();

router.use(authenticate);

router.post('/:id', isValidId, ctrlWrapper(createAppointmentController));
router.post('/:id', isValidId, ctrlWrapper(editAppointmentController));
router.post('/:id', isValidId, ctrlWrapper(deleteAppointmentController));

export default router;
