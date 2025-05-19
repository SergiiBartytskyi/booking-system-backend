import { Router } from 'express';
import {
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

router.get('/', ctrlWrapper(getUsersController));
router.get('/:id', isValidId, ctrlWrapper(getUserByIdController));
router.put('/:id', isValidId, ctrlWrapper(upsertUserController));
router.patch('/:id', isValidId, ctrlWrapper(patchUserController));
router.delete('/:id', isValidId, ctrlWrapper(deleteUserController));

export default router;
