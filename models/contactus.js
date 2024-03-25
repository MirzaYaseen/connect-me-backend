// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  query: String,
  email: String,
  website: String
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
