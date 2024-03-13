import React, { useState , useEffect } from "react";
import "./BBallCourt.css";
import TimeGrid from "./TimeGrid";
import { useUser } from "../UserContext";
import ViewSchedule from "./ViewSchedule";
import CreateUserMenu from "../CreateUserMenu";
import ConfirmedBookingPage from "./ConfirmedBookingPage";
const bball_court = require("./court-pics/BBallCourt.png");
const join_icon = require("./court-pics/join-icon.png");



const BBallCourt = ({ openingTime, closingTime, locationID , courtNumber , maxCap }) => {
  
  console.log("BBallCourt locationID:", courtNumber);
  const { user } = useUser();
  const [showTimeGrid, setShowTimeGrid] = useState(false);
  const [showViewSchedule, setShowViewSchedule] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showConfirmedBooking, setShowConfirmedBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState("");  
  const openTimeGrid = () => {
    
    if (user) {
      setShowTimeGrid(true);
    }
    else {
      setShowViewSchedule(true);
    }
    };
    
  const closeTimeGrid = () => {
    setShowTimeGrid(false);
  };
  
  const closeSignInMenu = () => {
    setShowViewSchedule(false);
  };

  const navigateToCreateUser = () => {
    setShowViewSchedule(false);
    setShowCreateUser(true);
  }

  const closeCreateUserMenu = () => {
    setShowCreateUser(false);
  }

  const navigateToSignIn = () => {
    setShowCreateUser(false);
    setShowViewSchedule(true);
  };

  const confirmedBookingDate = (date , start , end) => {
    
    
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of year

    setBookingDate(`Your booking for ${dayOfWeek}, ${day}/${month}/${year} at ${start}-${end} has been confirmed.`);
  }

  useEffect(() => {
    if (bookingDate) {
      setShowConfirmedBooking(true);
    }
  }, [bookingDate]);

  useEffect(() => {
    console.log(
      "showConfirmedBooking:",
      showConfirmedBooking,
      "bookingDate:",
      bookingDate
    );
    // This will log whenever showConfirmedBooking or bookingDate changes
  }, [showConfirmedBooking, bookingDate]);

  const closeConfirmedBooking = () => {
    setShowConfirmedBooking(false);
  }

    return (
      <div className="court-container">
        <img className="bball-pic" src={bball_court} alt="bball court" />
        <button className="left-join-button" onClick={openTimeGrid}>
          <img className="join-icon" src={join_icon} alt="join icon" />
        </button>
        <button className="right-join-button" onClick={openTimeGrid}>
          <img className="join-icon" src={join_icon} alt="join icon" />
        </button>
        {showTimeGrid && <TimeGrid user={user} closeTimeGrid={closeTimeGrid} openingTime={openingTime} closingTime={closingTime} locationID={locationID} courtNumber={courtNumber} maxCap={maxCap} confirmedBookingDate={confirmedBookingDate} />}
        {showConfirmedBooking && <ConfirmedBookingPage bookingDate={bookingDate} closeConfirmedBooking={closeConfirmedBooking} />}
        {showViewSchedule && <ViewSchedule closeSignInMenu={closeSignInMenu} navigateToCreateUser={navigateToCreateUser} />}
        {showCreateUser && <CreateUserMenu closeCreateUserMenu={closeCreateUserMenu} navigateToSignIn={navigateToSignIn}/>}
      </div>
    );

}
export default BBallCourt;