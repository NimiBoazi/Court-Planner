// HomePage.js
import React, { useState, useEffect } from "react";
import BBallCourt from "./Courts/BBallCourt";

const HomePage = ({ selectedLocation }) => {
  console.log("homepage:" + selectedLocation);

  return (
    <div className="courts-container">
      {selectedLocation &&
        selectedLocation.courts
          .filter((court) => court.courtType === "Basketball")
          .map((court, index) => (
            <BBallCourt
              key={index}
              courtNumber={court.courtNumber}
              openingTime={court.openingTime}
              closingTime={court.closingTime}
              locationID={selectedLocation._id}
              maxCap = {court.maxCapacity}
            />
          ))}
    </div>
  );
};

export default HomePage;
