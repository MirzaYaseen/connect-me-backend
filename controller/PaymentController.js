const Payment = require("../models/PaymentModel");

const processPayment = async (req, res) => {
  try {
    // Extract payment data from the request body
    const { cardHolderName, cardNumber, expirationDate, cvv, phoneNumber } =
      req.body;

    // Create a new payment instance
    const payment = new Payment({
      cardHolderName,
      cardNumber,
      expirationDate,
      cvv,
      phoneNumber,
      // Add other payment-related fields as needed
    });

    // Save the payment data to the database
    await payment.save();

    res.status(201).json({ message: "Payment processed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to process payment", error: error.message });
  }
};

module.exports = {
  processPayment,
};
