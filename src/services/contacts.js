import { ContactsCollection } from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  type,
  isFavourite,
  userId,
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsList = ContactsCollection.find();

  if (type) {
    contactsList.where('contactType').equals(type);
  }

  if (typeof isFavourite === 'boolean') {
    contactsList.where('isFavourite').equals(isFavourite);
  }

  if (userId) {
    contactsList.where('userId').equals(userId);
  }
  const [contantsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsList).countDocuments(),
    contactsList
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contantsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
}

export async function getContactById(contactId, userId) {
  return await ContactsCollection.findOne({ _id: contactId, userId });
}

export async function createContact(payload) {
  return await ContactsCollection.create(payload);
}

export async function updateContact(
  contactId,
  userId,
  { photo, ...payload },
  options = {},
) {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    { photo, ...payload },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
}

export async function deleteContact(contactId, userId) {
  return await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
}