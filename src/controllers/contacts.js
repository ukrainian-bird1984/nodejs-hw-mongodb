import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';
import saveFileToUploadDir from '../utils/saveFileToUploadDir.js';
import env from '../utils/env.js';
import { ENV_VARS } from '../constants/envVars.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';
import saveFile from '../utils/saveFile.js';

export async function getAllContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { type, isFavourite } = parseFilterParams(req.query);
  const userId = req.user._id;
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res, next) {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    return next(createHttpError(404, `Contact not found`));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const {
    body,
    user: { _id: userId },
    file,
  } = req;

  let photo;

  if (file) {
    photo = await saveFile(file);
  }

  const contact = await createContact({ ...body, userId, photo });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function patchContactController(req, res, next) {
  const {
    body,
    params: { contactId },
    user: { _id: userId },
    file,
  } = req;

  let photo;

  if (file) {
    photo = await saveFile(file);
  }

  const contact = await updateContact(contactId, userId, { photo, ...body });

  if (!contact) {
    return next(createHttpError(404, `Contact not found`));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact.contact,
  });
}

export async function deleteContactController(req, res, next) {
  const contactId = req.params.contactId;

  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    return next(createHttpError(404, `Contact not found`));
  }

  res.status(204).send();
}