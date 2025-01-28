const mongoose = require("mongoose");
const Location = require("../models/locationModel");

mongoose
  .connect("mongodb://localhost:27017/court_plannerDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

async function updateData() {
  const locations = await Location.find();

  for (let location of locations) {
    for (let court of location.courts) {
      const currentDate = new Date();

      court.openingTime = new Date(currentDate.setHours(7, 0, 0, 0));

      court.closingTime = new Date(currentDate.setHours(23, 0, 0, 0));
    }

    await location.save();
  }

  console.log("All data updated");
}

updateData()
  .then(() => mongoose.disconnect())
  .catch((err) => console.error(err));
