import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  upsertContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllContactsController = async (req, res) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts, 
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

export const getContactByIdController = async (req, res, next) => {
  const contactId = req.params.contactsId;

  if (!mongoose.isValidObjectId(contactId)) {
    return res.status(404).json({
      status: 404,
      message: `Id ${contactId} is not valid`,
    });
  }
  
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(createHttpError(500, 'Internal Server Error'));
  }
};

export const createContactController = async (req, res) => {
  const { body } = req;

  try {
    const contact = await createContact(body);

    res.status(201).json({
      status: 201,
      message: `Successfully created a contact!`,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

export const patchContactController = async (req, res, next) => {
  const contactId = req.params.contactsId;
  const { body } = req;

  try {
    const updatedContact = await upsertContact(contactId, body);

    if (!updatedContact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully patched a contact!`,
      data: updatedContact,
    });
  } catch (err) {
    next(createHttpError(500, 'Internal Server Error'));
  }
};

export const deleteContactController = async (req, res, next) => {
  const contactId = req.params.contactsId;

  try {
    const contact = await deleteContact(contactId);

    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(createHttpError(500, 'Internal Server Error'));
  }
};
