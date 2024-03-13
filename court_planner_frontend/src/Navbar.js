import React, { useState, useEffect } from "react";
import "./Navbar.css";
import SignInMenu from "./SignInMenu";
import CreateUserMenu from "./CreateUserMenu";
import { useUser } from "./UserContext"; // Import useUser hook
import { getLocations } from "./api/locations/getLocations";
const login_logo = require("./icons/login-logo.png");
const location_logo = require("./icons/location-logo.png");

const Navbar = ({ onDateChange, onLocationSelect }) => {
  const [isLoginMenuVisible, setIsLoginMenuVisible] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [ShowSignInMenu, setShowSignInMenu] = useState(false);
  const [ShowCreateUserMenu, setShowCreateUserMenu] = useState(false);
  const [locations, setLocations] = useState([]);


  const { user, logout, selectedLocationName } = useUser(); // Use the user from context

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationData = await getLocations();
        setLocations(locationData); // Set the fetched locations
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);


  const openCreateUserMenu = () => {
    setShowCreateUserMenu(true);
    setShowSignInMenu(false);
  };

  const closeCreateUserMenu = () => {
    setShowCreateUserMenu(false);
  };

  const navigateToSignIn = () => {
    setShowCreateUserMenu(false);
    setShowSignInMenu(true);
  };

  const openSignInMenu = () => {
    setShowSignInMenu(true);
    setIsLoginMenuVisible(false);
  };

  const closeSignInMenu = () => {
    setShowSignInMenu(false);
  };

  const navigateToCreateUser = () => {
    setShowSignInMenu(false);
    setShowCreateUserMenu(true);
  };

  const handleLocationMenuToggle = () => {
    setIsLoginMenuVisible(false);
    setShowLocations(!showLocations);
  };

  const handleLocationClick = (location) => {
    onLocationSelect(location);
    console.log(location._id);
    setShowLocations(false); // Hide location buttons after selection
  };

  return (
    <>
      <nav className="navbar">
        <div className="middle-section">
          <button
            className="location-button"
            onClick={handleLocationMenuToggle}
          >
            <img
              className="location-logo"
              src={location_logo}
              alt="location-logo"
            />
            LOCATION
          </button>
        </div>
        <div className="right-section">
          <div className="profile-menu">
            <button
              className="profile-button"
              onClick={() => {
                setIsLoginMenuVisible(!isLoginMenuVisible);
                setShowLocations(false);
              }}
            >
              <img
                className="profile-logo"
                src={login_logo}
                alt="profile-logo"
              />
            </button>
            {
              isLoginMenuVisible &&
                (user ? (
                  <>
                    <button className="user-email">{user.email}</button>
                    <button className="logout-button" onClick={logout}>
                      Log Out
                    </button>
                  </>
                ) : (
                  <button className="signIn-button" onClick={openSignInMenu}>
                    Sign In
                  </button>
                )) // Otherwise show the Sign In button
            }
            {ShowSignInMenu && (
              <SignInMenu
                closeSignInMenu={closeSignInMenu}
                navigateToCreateUser={navigateToCreateUser}
              />
            )}
            {ShowCreateUserMenu && (
              <CreateUserMenu
                closeCreateUserMenu={closeCreateUserMenu}
                navigateToSignIn={navigateToSignIn}
              />
            )}
          </div>
        </div>
        {showLocations && (
          <div className="location-menu">
            {locations.map((location) => (
              <button
                key={location._id}
                className="location-name-button"
                onClick={() => handleLocationClick(location)}
              >
                {location.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
