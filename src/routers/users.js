import { Router } from 'express';
import {
  currentUserController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  patchUserController,
  upsertUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/business', ctrlWrapper(getUsersController));
router.get('/business/:id', isValidId, ctrlWrapper(getUserByIdController));
router.get('/me', ctrlWrapper(currentUserController));
router.put('/:id', isValidId, ctrlWrapper(upsertUserController));
router.patch('/:id', isValidId, ctrlWrapper(patchUserController));
router.delete('/:id', isValidId, ctrlWrapper(deleteUserController));

export default router;
