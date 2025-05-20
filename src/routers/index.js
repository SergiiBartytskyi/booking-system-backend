import { Router } from 'express';
import authRouter from './auth.js';
import usersRouter from './users.js';
import appointmentsRouter from './appointments.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/appointments', appointmentsRouter);

export default router;
