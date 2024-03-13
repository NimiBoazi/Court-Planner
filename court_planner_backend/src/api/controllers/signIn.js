// controllers/signIn.js
const User = require("../models/userModel");

exports.signIn = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() }); // Assuming email is stored in lowercase
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check if the provided password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // User authenticated successfully
    // Here, you can create a session or a token (like JWT) as per your requirement
    // For this example, just returning the user's email (avoid sending password)
    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({ message: "Server error during sign in." });
  }
};
