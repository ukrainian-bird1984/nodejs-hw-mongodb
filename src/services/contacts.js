import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const totalItems = await ContactsCollection.countDocuments();
  const contacts = await ContactsCollection.find()
    .skip(skip)
    .limit(limit)
    .sort({
      [sortBy]: sortOrder,
    })
    .exec();

  const paginationData = calculatePaginationData(page, perPage, totalItems);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) =>
  await ContactsCollection.findById(contactId);

export const createContact = async (payload) =>
  await ContactsCollection.create(payload);

export const updateContact = async (contactId, payload) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );

  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};