import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'Set name for contact',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'Set phone number for contact',
  }),
  email: Joi.string().email().min(3).max(20).optional(),
  isFavorite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'personal', 'home')
    .default('personal'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'personal', 'home'),
});