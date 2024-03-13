import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export async function getBookings(locationId, selectedDate , courtNumber) {
  try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("timezone: ", userTimeZone);
    console.log("selected date: ", selectedDate);
      const response = await api.get("/bookings", {
      params: { locationId, selectedDate , courtNumber , userTimeZone },
    });
      console.log("sjsh", response.data);
    return response.data; // The response data is an array of locations
  } catch (error) {
    console.error("Error during fetching bookings:", error.response || error);
    throw error;
  }
}
