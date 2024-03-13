const mongoose = require("mongoose");
const Location = require("../models/locationModel"); // Update with the path to your model

mongoose
  .connect("mongodb://localhost:27017/court_plannerDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

async function updateData() {
  const locations = await Location.find(); // Fetch all locations

  for (let location of locations) {
    for (let court of location.courts) {
      const currentDate = new Date();

      // Set opening time to 7:00 AM on the current date
      court.openingTime = new Date(currentDate.setHours(7, 0, 0, 0));

      // Set closing time to 11:00 PM on the current date
      court.closingTime = new Date(currentDate.setHours(23, 0, 0, 0));
    }

    await location.save(); // Save the updated location
  }

  console.log("All data updated");
}

updateData()
  .then(() => mongoose.disconnect())
  .catch((err) => console.error(err));
