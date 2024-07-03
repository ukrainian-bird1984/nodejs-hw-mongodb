import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username have at least {#limit} characters',
    'string.max': 'Username have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number have at least {#limit} characters',
    'string.max': 'Phone number have at most {#limit} characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only':
        'Contact type must be one of the following: work, home, personal',
      'any.required': 'Contact type is required',
    }),
  photo: Joi.string().messages({
    'string.base': 'Photo field must contain a text string',
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username have at least {#limit} characters',
    'string.max': 'Username have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number have at least {#limit} characters',
    'string.max': 'Phone number have at most {#limit} characters',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email should be a string',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type should be a string',
    'any.only':
      'Contact type must be one of the following: work, home, personal',
  }),
  photo: Joi.string().messages({
    'string.base': 'Photo field must contain a text string',
  }),
});