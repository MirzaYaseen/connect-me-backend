const express = require("express");
const router = express.Router();
const paymentController = require("../controller/PaymentController");

router.post("/process-payment", paymentController.processPayment);

module.exports = router;
