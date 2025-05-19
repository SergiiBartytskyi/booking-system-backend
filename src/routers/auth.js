import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();

router.post('/signup', ctrlWrapper(registerUserController));
router.post('/signin', ctrlWrapper(loginUserController));
router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
