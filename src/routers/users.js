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

const router = Router();

router.get('/', ctrlWrapper(getUsersController));
router.get('/:id', ctrlWrapper(getUserByIdController));
router.post('/', ctrlWrapper(createUserController));
router.put('/:id', ctrlWrapper(upsertUserController));
router.patch('/:id', ctrlWrapper(patchUserController));
router.delete('/:id', ctrlWrapper(deleteUserController));

export default router;
