import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export async function orderBooking(
  date,
  startTime,
  endTime,
  courtNumber,
  location,
  maxCap,
  email
) {
  try {
    console.log("date: ", date);
    console.log("startTime: ", startTime);
    console.log("endTime: ", endTime);
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) {
        hours += 12;
      } else if (modifier === "AM" && hours === 12) {
        hours = 0;
      }
      return [hours, minutes];
    };

    const startDate = new Date(date);
    console.log("1start", startDate);
    const [startHours, startMinutes] = parseTime(startTime);
    console.log("starthours", startHours, "startmin", startMinutes);
    startDate.setHours(startHours, startMinutes, 0, 0);
    const endDate = new Date(date);
    const [endHours, endMinutes] = parseTime(endTime);
    endDate.setHours(endHours, endMinutes, 0, 0);

    console.log("startDate: ", startDate);
    console.log("endDate: ", endDate);

    const reqData = {
      startTime: startDate,
      endTime: endDate,
      courtNumber,
      location,
      maxCap,
      email,
    };

    const response = await api.post("/bookings/order", reqData);
    return response.data; // The response data is an array of locations
  } catch (error) {
    console.error("Error during ordering booking:", error.response || error);
    throw error;
  }
}
