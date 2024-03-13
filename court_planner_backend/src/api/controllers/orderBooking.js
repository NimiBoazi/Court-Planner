const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const moment = require("moment-timezone");

exports.orderBooking = async (req, res) => {
  try {
    const { startTime, endTime, courtNumber, location, maxCap , email } = req.body;

    console.log("startTime: ", startTime);
    console.log("endtime: ", endTime);
    let startInterval = new Date(startTime);
    const endInterval = new Date(endTime);
    let isOverCapacity = false;
    let userHasBooking = false;
    

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).send("User not found");
    }
      
    while (startInterval < endInterval) {
      // Define the next half-hour interval
      let nextInterval = new Date(startInterval);
      nextInterval.setMinutes(startInterval.getMinutes() + 30);

      // Find overlapping bookings
      const overlappingBookings = await Booking.countDocuments({
        courtNumber: courtNumber,
        location: location,
        $or: [
          { startTime: { $lt: nextInterval, $gte: startInterval } },
          { endTime: { $gt: startInterval, $lte: nextInterval } },
          {
            startTime: { $lte: startInterval },
            endTime: { $gte: nextInterval },
          },
        ],
      });
        
        const userBooking = await Booking.findOne({
          user: user._id,
          courtNumber: courtNumber,
          location: location,
          $or: [
            { startTime: { $lt: nextInterval, $gte: startInterval } },
            { endTime: { $gt: startInterval, $lte: nextInterval } },
          ],
        });    

      if (overlappingBookings >= maxCap) {
        isOverCapacity = true;
        break;
      }
      if (userBooking) {
        userHasBooking = true;
        break;
      }

      // Move to the next interval
      startInterval = nextInterval;
    }

    if (isOverCapacity) {
      res.status(400).send("Booking cannot be made due to overcapacity.");
    }
    else if (userHasBooking) {
      res.status(400).send("Booking cannot be made as the user already has a booking in this time slot.");
    }
    else {
      // Proceed with saving the booking
        // ... (create and save the new booking)
        const newBooking = new Booking({
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          courtNumber,
          location,
          user: user._id,
        });
        console.log(newBooking);

        await newBooking.save();
        res.status(201).json(newBooking);
        
    }
  } catch (error) {
    console.error("Error in orderBooking:", error);
    res.status(500).send("An error occurred");
  }
};
