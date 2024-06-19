import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', authenticate, ctrlWrapper(getContactsController));
router.get('/:contactId', authenticate, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  upload.single('photo'),
  ctrlWrapper(createStudentController),
);

router.delete(
  '/:contactId',
  authenticate,
  ctrlWrapper(deleteContactController),
);

router.put(
  '/:contactId',
  authenticate,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  upload.single('photo'),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/:contactId',
  authenticate,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateStudentSchema),
  upload.single('photo'),
  ctrlWrapper(patchStudentController),
);

export default router;