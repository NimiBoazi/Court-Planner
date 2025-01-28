const express = require("express");
const router = express.Router();
const { getLocations } = require("../controllers/getLocations");

router.get("/", getLocations);

module.exports = router;
