//controllers/createUser.js
const User = require("../models/userModel");

// createUser function to handle POST request
exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      res
        .status(409)
        .json({ message: "An account with this email already exists." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};
