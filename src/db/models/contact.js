import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    photo: { type: String },
    userId: { type: Schema.ObjectId, required: false },
  },
  { timestamps: true, versionKey: false },
);

export const ContactsCollection = model('contacts', contactSchema);