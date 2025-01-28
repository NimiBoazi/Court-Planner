const mongoose = require("mongoose");
const Location = require("../models/locationModel");

mongoose.connect("mongodb://localhost:27017/court_plannerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const location = new Location({
  name: "Tel Aviv",
  address: "Marmorek 21, Tel Aviv",
  courts: Array(5)
    .fill()
    .map((_, index) => ({
      courtNumber: index + 1,
      openingTime: "7:00",
      closingTime: "23:00",
      maxCapacity: 12,
      courtType: "Basketball",
    })),
});

location
  .save()
  .then(() => {
    console.log("Location added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error adding location:", err);
    mongoose.connection.close();
  });
