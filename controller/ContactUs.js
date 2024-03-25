// controllers/contactController.js
const Contact = require('../models/contactus');

exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, query, email, website } = req.body;
    
    const contact = new Contact({
      firstName,
      lastName,
      query,
      email,
      website
    });

    await contact.save();
    
    res.status(201).json({ message: 'Contact created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
