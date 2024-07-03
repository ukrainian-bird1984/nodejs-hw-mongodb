import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoId =
  (idName = 'contactId') =>
  (req, res, next) => {
    const id = req.params[idName];

    if (!isValidObjectId(id)) {
      return next(createHttpError(400, 'Invalid contact id provided'));
    }

    next();
  };