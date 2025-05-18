import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  patchUserController,
  upsertUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));
router.get('/:id', isValidId, ctrlWrapper(getUserByIdController));
router.post('/', ctrlWrapper(createUserController));
router.put('/:id', isValidId, ctrlWrapper(upsertUserController));
router.patch('/:id', isValidId, ctrlWrapper(patchUserController));
router.delete('/:id', isValidId, ctrlWrapper(deleteUserController));

export default router;
