const Location = require("../models/locationModel");
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching locations", error: error });
  }
};
