import createHttpError from 'http-errors';

import { ContactsCollection } from '../db/models/contact.js';

export const checkUserId = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId,
  });

  if (!contact) {
    return next(
      createHttpError(
        403,
        'Current user can not access this contact',
      ),
    );
  }

  next();
};