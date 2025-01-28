const Booking = require("../models/bookingModel");
const Location = require("../models/locationModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const moment = require("moment-timezone");

exports.getBookings = async (req, res) => {
  try {
    console.log("enter");
    const { locationId, selectedDate, courtNumber, userTimeZone } = req.query;
    const location = await Location.findById(locationId).lean();
    if (!location) {
      return res.status(404).send("Location not found");
    }

    let currentInterval = moment(selectedDate)
      .tz(userTimeZone)
      .set({
        hour: location.courts[courtNumber - 1].openingTime.getHours(),
        minute: location.courts[courtNumber - 1].openingTime.getMinutes(),
        second: 0,
        millisecond: 0,
      });

    currentIntervalUTC = moment.tz(currentInterval, userTimeZone).tz("UTC");
    console.log("current: ", currentIntervalUTC);

    let closingTime = moment(selectedDate)
      .tz(userTimeZone)
      .set({
        hour: location.courts[courtNumber - 1].closingTime.getHours(),
        minute: location.courts[courtNumber - 1].closingTime.getMinutes(),
        second: 0,
        millisecond: 0,
      });

    closingTimeUTC = moment.tz(closingTime, userTimeZone).tz("UTC");
    let intervals = [];
    console.log("closing: ", closingTimeUTC);

    while (currentIntervalUTC <= closingTimeUTC) {
      let nextIntervalUTC = currentIntervalUTC.clone().add(30, "minutes");
      console.log(
        "interval2",
        currentIntervalUTC.clone().tz(userTimeZone).format("HH:mm")
      );
      console.log(
        "end2: ",
        closingTimeUTC.clone().tz(userTimeZone).format("HH:mm")
      );
      const bookings = await Booking.find({
        location: locationId,
        courtNumber: courtNumber,
        startTime: { $lte: currentIntervalUTC.toDate() },
        endTime: { $gt: currentIntervalUTC.toDate() },
      })
        .populate("user", "email")
        .lean();

      console.log(
        "interval1",
        currentIntervalUTC.clone().tz(userTimeZone).format("HH:mm")
      );
      console.log(
        "end1: ",
        closingTimeUTC.clone().tz(userTimeZone).format("HH:mm")
      );
      const players = bookings.map((booking) => booking.user.email);

      const intervalName = currentIntervalUTC
        .clone()
        .tz(userTimeZone)
        .format("HH:mm");
      console.log("interval", intervalName);
      console.log(
        "end: ",
        closingTimeUTC.clone().tz(userTimeZone).format("HH:mm")
      );
      intervals.push({ name: intervalName, players });

      currentIntervalUTC = nextIntervalUTC;
    }
    console.log(intervals);
    res.json(intervals);
  } catch (error) {
    console.error("Error in getBookings:", error);
    res.status(500).send("An error occurred");
  }
};
