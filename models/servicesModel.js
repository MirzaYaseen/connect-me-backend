const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  refOfUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Service must belong to a ServiceProvider"],
  },

  ServiceProviderName: {
    type: String,
    
  },

  category: {
    type: String,
    
  },

  takerName: {
    type: String,
    
  },

  serviceDescription: {
    type: String,
    trim: true,
  },

  // PdfLocation: {
  //   type: String,
  //   trim: true,
  // },

  serviceName:{
   type:String,
  },

  price:{
  type:Number,
  trim:true
  },

  // pdfData: {
  //   type: String,
  //   trim: true,
  // },
});

const service = mongoose.model("services", serviceSchema); // it will create a collection with userSchema
module.exports = service;
