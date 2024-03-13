//routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/createUser");
const { signIn } = require("../controllers/signIn");

// Define the route for creating a new user
router.post("/create", createUser);
router.post("/signIn", signIn);

module.exports = router;
