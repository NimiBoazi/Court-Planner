const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({ message: "An account with this email already exists." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};
