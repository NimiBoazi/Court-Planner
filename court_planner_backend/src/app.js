const express = require("express");
const app = express();
const cors = require("cors");
require("./db");
const userRoutes = require("./api/routes/userRoutes");
const locationRoutes = require("./api/routes/locationRoutes");
const bookingRoutes = require("./api/routes/bookingRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
