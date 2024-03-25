// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controller/ContactUs');

router.post('/contact', contactController.createContact);

module.exports = router;
