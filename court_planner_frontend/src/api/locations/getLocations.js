import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export async function getLocations() {
  try {
    const response = await api.get("/locations");
    return response.data; // The response data is an array of locations
  } catch (error) {
    console.error("Error during fetching locations:", error.response || error);
    throw error;
  }
}
