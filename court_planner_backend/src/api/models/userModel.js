//models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Regex to validate the email
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // You can set the minimum length for a password
    // Do not use `trim` for passwords, as spaces are valid password characters
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
