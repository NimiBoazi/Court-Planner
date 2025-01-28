const mongoose = require("mongoose");

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

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  courts: [courtSchema],
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
