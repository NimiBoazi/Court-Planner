// Calander.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calander = ({ onChange }) => {
  // Accept the onChange prop
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    onChange(date); // Call the onChange callback with the new date
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange} // Use the handleDateChange function
      isClearable
      placeholderText="Pick Date"
      minDate={new Date()}
    />
  );
};

export default Calander;
