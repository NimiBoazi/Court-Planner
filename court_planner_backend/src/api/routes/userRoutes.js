const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/createUser");
const { signIn } = require("../controllers/signIn");

router.post("/create", createUser);
router.post("/signIn", signIn);

module.exports = router;
