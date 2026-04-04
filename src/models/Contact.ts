import mongoose, { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread',
  }
}, { timestamps: true });

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;
