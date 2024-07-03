import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
// import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
// import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const contactId = req.params.contactsId;
  const userId = req.user._id;

  const contact = await getContactById(contactId, userId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
// POST
export const createContactController = async (req, res) => {
  const { body, file } = req;
  let photoUrl;
  if (file) {
    photoUrl = await saveFileToCloudinary(file);
  }

  // if (file) {
  //   if (env('ENABLE_CLOUDINARY') === 'true') {
  //     photoUrl = await saveFileToCloudinary(file);
  //   } else {
  //     photoUrl = await saveFileToUploadDir(file);
  //   }
  // }

  const contact = await createContact(
    { ...body, photo: photoUrl },
    req.user._id,
  );

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

// PATCH
export const patchContactController = async (req, res, next) => {
  const contactId = req.params.contactsId;
  const { body, file } = req;
  const userId = req.user._id;
  let photoUrl;
  if (file) {
    photoUrl = await saveFileToCloudinary(file);
  }

  // if (file) {
  //   if (env('ENABLE_CLOUDINARY') === 'true') {
  //     photoUrl = await saveFileToCloudinary(file);
  //   } else {
  //     photoUrl = await saveFileToUploadDir(file);
  //   }
  // }

  const updatedContact = await updateContact(contactId, userId, {
    ...body,
    photo: photoUrl,
  });

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

// DELETE
export const deleteContactController = async (req, res, next) => {
  const contactId = req.params.contactsId;
  const userId = req.user._id;
  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.sendStatus(204);
};