import React, { useState, useEffect } from "react";
import "./TimePicker.css";
import Calander from "./Calander";

function TimePicker({
  data,
  handleTimeSelect,
  defaultStartTime,
  defaultEndTime,
  handleDateChange,
}) {
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(data);
    console.log("hi");
  }, [data]);

  const handleTimeChange = (time, isStart) => {
    let startIndex;
    let endIndex;

    if (isStart) {
      startIndex = data.findIndex((obj) => obj.name === time);
      if (defaultEndTime) {
        endIndex = data.findIndex((obj) => obj.name === defaultEndTime);
        if (startIndex < endIndex - 1) {
          handleTimeSelect([startIndex, endIndex - 1]);
        } else if (startIndex === endIndex - 1) {
          handleTimeSelect([startIndex, startIndex]);
        } else {
          handleTimeSelect([startIndex, startIndex]);
        }
      } else {
        handleTimeSelect([startIndex, startIndex]);
      }
    } else {
      endIndex = data.findIndex((obj) => obj.name === time);
      if (defaultStartTime) {
        startIndex = data.findIndex((obj) => obj.name === defaultStartTime);
        if (startIndex < endIndex - 1) {
          console.log("1");
          handleTimeSelect([startIndex, endIndex - 1]);
        } else if (startIndex === endIndex - 1) {
          console.log("2");
          handleTimeSelect([startIndex, startIndex]);
        } else {
          console.log("3");
          handleTimeSelect([endIndex - 1, endIndex - 1]);
        }
      } else {
        handleTimeSelect([endIndex - 1, endIndex - 1]);
      }
    }
  };

  const handleResetClick = () => {
    handleTimeSelect([]);
  };

  const handleDateSelection = (selectedDate) => {
    handleDateChange(selectedDate);
  };

  return (
    <div>
      <Calander onChange={handleDateSelection} />
      <span>Start Time</span>
      <select
        value={defaultStartTime}
        onChange={(e) => {
          setStartTime(e.target.value);
          handleTimeChange(e.target.value, true);
        }}
      >
        {defaultStartTime === "" && (
          <option value="">{defaultStartTime || "Select a time"}</option>
        )}
        {options.map((object, index) => {
          if (index < options.length - 1) {
            return (
              <option key={object.name} value={object.name}>
                {object.name}
              </option>
            );
          }
          return null;
        })}
      </select>

      <span>End Time</span>
      <select
        value={defaultEndTime}
        onChange={(e) => {
          setEndTime(e.target.value);
          handleTimeChange(e.target.value, false);
        }}
      >
        {defaultEndTime === "" && (
          <option value="">{defaultEndTime || "Select a time"}</option>
        )}
        {options.map((object, index) => {
          if (index > 0) {
            return (
              <option key={object.name} value={object.name}>
                {object.name}
              </option>
            );
          }
          return null;
        })}
      </select>
      <button className="reset-button" onClick={handleResetClick}>
        Reset
      </button>
    </div>
  );
}

export default TimePicker;
