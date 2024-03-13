const mongoose = require("mongoose");

// Define the Court schema
const courtSchema = new mongoose.Schema({
  courtNumber: {
    type: Number,
    required: true,
  },
  openingTime: {
    type: Date,
    required: true,
  },
  closingTime: {
    type: Date,
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  courtType: {
    type: String,
    required: true,
  },
});

// Define the Location schema
const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  courts: [courtSchema], // Array of Court documents
});

// Create the model from the schema
const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
