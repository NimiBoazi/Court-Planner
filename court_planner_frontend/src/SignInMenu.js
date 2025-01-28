import React, { useState } from "react";
import "./SignInMenu.css";
import { useUser } from "./UserContext";
import { signIn } from "./api/user/signIn";

const SignInMenu = ({ closeSignInMenu, navigateToCreateUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({ email, password });
      setUser({ email: response.email });
      closeSignInMenu();
    } catch (error) {
      console.error("Error during user creation:", error);
    }
  };

  return (
    <div className="dim-background" onClick={(e) => e.stopPropagation()}>
      <div className="sign-in-window">
        <button className="close-button" onClick={closeSignInMenu}>
          X
        </button>
        <p>Log in</p>
        <div className="new-user-text">
          New user?{" "}
          <a
            href="/create-account"
            className="create-account-link"
            onClick={(e) => {
              e.preventDefault();
              navigateToCreateUser();
            }}
          >
            Create new account
          </a>
        </div>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="log-in-button">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInMenu;
