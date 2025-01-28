const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = require("./userModel");

const bookingSchema = new Schema({
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  courtNumber: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
