const express = require("express");
const router = express.Router();
const { getBookings } = require("../controllers/getBookings");
const { orderBooking } = require("../controllers/orderBooking");

router.post("/order", orderBooking);
router.get("/", getBookings);

module.exports = router;
