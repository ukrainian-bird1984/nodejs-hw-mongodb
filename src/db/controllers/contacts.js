import { Router } from 'express';
import mongoose from 'mongoose';
import { getAllContacts, getContactById } from './services/contacts.js';

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};
 
export const getContactByIdController = async (req, res) => {

const { contactsId } = req.params;
  const contact = await getContactById(studentId);

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};

