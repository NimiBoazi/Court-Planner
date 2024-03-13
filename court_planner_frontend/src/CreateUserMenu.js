import React, { useState } from "react";
import "./CreateUserMenu.css";
import { createUser } from "./api/user/createUser";

const CreateUserMenu = ({ closeCreateUserMenu, navigateToSignIn }) => {
  // Local state to store the user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      console.log("Passwords do not match!");
      return; // Exit early if passwords do not match
    }
    // Assuming your createUser function takes an object with email and password
    try {
      const response = await createUser({ email, password });
      console.log(response);
      // Handle the successful response, e.g., navigate to a login page or show a success message
    } catch (error) {
      console.error("Error during user creation:", error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <div
      className="dim-background"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="create-user-window">
        <button className="close-button" onClick={closeCreateUserMenu}>
          X
        </button>
        <p>Create your user</p>
        <div className="new-user-text">
          Already have an account?{" "}
          <span
            className="log-in-link"
            onClick={navigateToSignIn}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Log in
          </span>
        </div>
        <form className="create-user-form" onSubmit={handleSubmit}>
          <input
            className="email"
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="verify-password"
            placeholder="Verify password"
            type="password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            required
          />
          <button className="create-account-button" type="submit">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateUserMenu;
