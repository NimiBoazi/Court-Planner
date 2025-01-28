import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export async function signIn(userData) {
  try {
    const response = await api.post("/users/signIn", userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert(error.response.data.message);
    } else {
      console.error("Error during user sign in:", error.response || error);
    }
    throw error;
  }
}
