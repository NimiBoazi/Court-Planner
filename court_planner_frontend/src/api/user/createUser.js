import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api"
});

export async function createUser(userData) {
    try {
    const response = await api.post("/users/create", userData);
    return response.data; // The response data is already parsed as JSON
    } catch (error) {
        if (error.response && error.response.status === 409) {
            alert(error.response.data.message);
        }
        else {
            console.error("Error during user creation:", error.response);
        }
    throw error;
  }
}

