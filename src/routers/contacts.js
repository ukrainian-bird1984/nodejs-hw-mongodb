import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
<<<<<<< HEAD
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
=======
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../middlewares/validateBody.js';
import {
  contactCreateValidationSchema,
  contactUpdateValidationSchema,
} from '../validation/contact.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
>>>>>>> fae16317c877f2e20c63ba15b1c30f5979a3e170

export const contactsRouter = Router();
contactsRouter.use('/contacts/:contactsId', validateMongoId('contactsId'));

<<<<<<< HEAD
router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.put(
  '/:contactId',
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
=======
contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactsId',
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/contacts',
  validationBody(contactCreateValidationSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/contacts/:contactsId',
  validationBody(contactUpdateValidationSchema),
>>>>>>> fae16317c877f2e20c63ba15b1c30f5979a3e170
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/contacts/:contactsId',
  ctrlWrapper(deleteContactController),
);