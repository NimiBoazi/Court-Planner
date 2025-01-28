import React from "react";
import "./ConfirmedBookingPage.css";

const ConfirmedBookingPage = ({ bookingDate, closeConfirmedBooking }) => {
  console.log(bookingDate);
  return (
    <div className="dim-background">
      <div className="page-window">
        <button className="close-button" onClick={closeConfirmedBooking}>
          X
        </button>
        <div className="confirmed-text">{bookingDate}</div>
      </div>
    </div>
  );
};

export default ConfirmedBookingPage;
