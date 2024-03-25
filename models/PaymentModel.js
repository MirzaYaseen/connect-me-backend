const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  cardHolderName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  // Add other payment-related fields as needed
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
