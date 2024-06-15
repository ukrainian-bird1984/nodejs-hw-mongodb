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

const router = Router();

router.use(authenticate);

router.get('/', authenticate, ctrlWrapper(getContactsController));
router.get('/:contactId', authenticate, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
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
);

router.patch(
  '/:contactId',
  authenticate,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;