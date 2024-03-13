//api/controllers/getLocations.js
const Location = require("../models/locationModel"); // Adjust the path as needed

exports.getLocations = async (req, res) => {
  try {
      const locations = await Location.find({});
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching locations", error: error });
  }
};
