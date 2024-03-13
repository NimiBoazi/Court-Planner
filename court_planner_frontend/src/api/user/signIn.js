import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export async function signIn(userData) {
  try {
    const response = await api.post("/users/signIn", userData);
    return response.data;
  } catch (error) {
    // Check if the error response status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Alert the user with the message from the backend
      alert(error.response.data.message);
    } else {
      console.error("Error during user sign in:", error.response || error);
    }
    throw error;
  }
}
