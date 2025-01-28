import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import "./TimeGrid.css";
import CustomBar from "./CustomBar";
import TimePicker from "./TimePicker";
import CustomTick from "./CustomTick";
import { getBookings } from "../api/bookings/getBookings";
import { orderBooking } from "../api/bookings/orderBooking";

export default class TimeGrid extends PureComponent {
  constructor(props) {
    super(props);
    const { maxCap } = this.props;

    this.windowRef = React.createRef();
    this.chartControlsRef = React.createRef();
    this.scrollContainerRef = React.createRef();
    
    if (this.props.openingTime && this.props.closingTime) {
      let selectedDate = new Date();
      //  const updatedData = timeSlots.map((time, index) => ({
      //    name: time,
      //    players: index === timeSlots.length - 1 ? 0 : 10, // Set players to 0 for the last entry, 10 for others
      //  }));
      console.log("Id " + props.locationID);

      this.state = {
        data: [],
        clickedIndexes: [],
        hoveredIndexes: [],
        message: "",
        clicks: 0,
        maxCap: maxCap,
        visibleBars: 10,
        numberOfBars: 0,
        chartHeight: 500,
        chartWidth: 2000,
        chartControlsWidth: 700,
        chartControlsHeight: 500,
        barSize: 20,
        startTime: "",
        endTime: "",
        rightGap: 0,
        selectedDate: new Date(),
        user: props.user,
        isLoading: false,
      };
    }
  }

  handleTimeSelect = (indexes, isStart) => {
    let newClickedIndexes = [];
    let newHoveredIndexes = [];
    let message = "";
    let newStartTime = this.state.startTime;
    let newEndTime = this.state.endTime;
    let updatedData = this.state.data;
    let newClicks;
    let flag = false;
    console.log("here5", indexes);
    switch (indexes.length) {
      case 0:
        console.log("enter");
        newStartTime = "";
        newEndTime = "";
        newClicks = 0;
        newHoveredIndexes = [];
        newClickedIndexes = [];
        if (this.state.clickedIndexes.length === 0) {
          break;
        } else if (
          this.state.clickedIndexes[0] === this.state.clickedIndexes[1]
        ) {
          this.decrementPlayers(updatedData, [this.state.clickedIndexes[0]]);
        } else {
          this.decrementPlayersInRange(
            updatedData,
            ...this.state.clickedIndexes
          );
          this.decrementPlayers(updatedData, [...this.state.clickedIndexes]);
        }
        break;
      case 2:
        if (
          indexes[0] === indexes[1] &&
          this.state.data[indexes[0]].players !== this.state.maxCap
        ) {
          newHoveredIndexes = indexes;
          newClickedIndexes = indexes;
          newHoveredIndexes = this.addToHoveredIndexes(newHoveredIndexes);
          newStartTime = this.state.data[indexes[0]].name;
          newEndTime = this.state.data[indexes[1] + 1].name;
          newClicks = 2;
          if (this.state.clickedIndexes.length === 0) {
            this.incrementPlayers(updatedData, [indexes[0]]);
          } else {
            if (this.state.clickedIndexes[0] === this.state.clickedIndexes[1]) {
              this.decrementPlayers(updatedData, [
                this.state.clickedIndexes[0],
              ]);
              this.incrementPlayers(updatedData, [indexes[0]]);
            } else {
              console.log("9");
              this.decrementPlayersInRange(
                updatedData,
                ...this.state.clickedIndexes
              );
              this.decrementPlayers(updatedData, [
                ...this.state.clickedIndexes,
              ]);
              this.incrementPlayers(updatedData, [indexes[0]]);
            }
          }
        } else if (this.validTimeSlot(...indexes, true)) {
          newHoveredIndexes = indexes;
          newClickedIndexes = indexes;
          newHoveredIndexes = this.addToHoveredIndexes(newHoveredIndexes);
          newStartTime = this.state.data[indexes[0]].name;
          newEndTime = this.state.data[indexes[1] + 1].name;
          newClicks = 2;
          if (this.state.clickedIndexes.length === 0) {
            console.log("1*");
            this.incrementPlayersInRange(updatedData, ...newClickedIndexes);
            this.incrementPlayers(updatedData, [...newClickedIndexes]);
          } else if (
            this.state.clickedIndexes[0] === this.state.clickedIndexes[1]
          ) {
            console.log("2*");
            this.decrementPlayers(updatedData, [this.state.clickedIndexes[0]]);
            this.incrementPlayersInRange(updatedData, ...indexes);
            this.incrementPlayers(updatedData, [...indexes]);
          } else if (indexes[0] < Math.min(...this.state.clickedIndexes)) {
            this.incrementPlayersInRange(
              updatedData,
              indexes[0],
              Math.min(...this.state.clickedIndexes)
            );
            this.incrementPlayers(updatedData, [indexes[0]]);
          } else if (
            indexes[0] > Math.min(...this.state.clickedIndexes) &&
            indexes[0] < Math.max(...this.state.clickedIndexes)
          ) {
            this.decrementPlayersInRange(
              updatedData,
              Math.min(...this.state.clickedIndexes),
              indexes[0]
            );
            this.decrementPlayers(updatedData, [
              Math.min(...this.state.clickedIndexes),
            ]);
          } else if (indexes[1] > Math.max(...this.state.clickedIndexes)) {
            this.incrementPlayersInRange(
              updatedData,
              Math.max(...this.state.clickedIndexes),
              indexes[1]
            );
            this.incrementPlayers(updatedData, [indexes[1]]);
          } else if (
            indexes[1] < Math.max(...this.state.clickedIndexes) &&
            indexes[1] > Math.min(...this.state.clickedIndexes)
          ) {
            this.decrementPlayersInRange(
              updatedData,
              Math.max(...this.state.clickedIndexes),
              indexes[1]
            );
            this.decrementPlayers(updatedData, [
              Math.max(...this.state.clickedIndexes),
            ]);
          }
        } else {
          flag = true;
          message = "invalid time slot";

          break;
        }
    }
    if (!flag) {
      this.setState(
        {
          clicks: newClicks,
          message,
          startTime: newStartTime,
          endTime: newEndTime,
          data: updatedData,
          clickedIndexes: newClickedIndexes,
          hoveredIndexes: newHoveredIndexes,
        },
        () => {
          console.log("Time select updated. Clicked: " + newClickedIndexes);
        }
      );
    } else {
      this.setState({ message });
    }
    if (message) {
      setTimeout(() => {
        this.setState({ message: "" });
      }, 5000);
    }
  };

  addToClickedIndexes = (indexes) => {
    let newClickedIndexes = [];

    if (indexes.length === 1) {
      newClickedIndexes = [indexes[0]];
    } else if (indexes.length === 2) {
      newClickedIndexes = [Math.min(...indexes), Math.max(...indexes)];
    }

    this.setState({ clickedIndexes: newClickedIndexes });
  };

  handleDateChange = (newDate) => {
    this.setState(
      {
        selectedDate: newDate,
        clicks: 0,
        clickedIndexes: [],
        hoveredIndexes: [],
      },
      () => {
        this.fetchBookingData();
      }
    );
    console.log(newDate);
  };

  addToHoveredIndexes = (indexes) => {
    let newHoveredIndexes = [];

    if (indexes.length === 2) {
      for (let i = Math.min(...indexes) + 1; i < Math.max(...indexes); i++) {
        newHoveredIndexes.push(i);
      }
    }
    return newHoveredIndexes;
  };

  getFillColor = (players) => {
    const twoThirdsOfMaxCap = (2 * this.state.maxCap) / 3;

    if (players <= twoThirdsOfMaxCap) return "#32cd32";
    if (players > twoThirdsOfMaxCap && players < this.state.maxCap)
      return "#ffd700";
    if (players === this.state.maxCap) return "#dc143c";

    return "#8884d8"; // default color
  };

  validTimeSlot(index1, index2, flag) {
    let indexswap;
    let indexes = [];
    let { data, clickedIndexes, hoveredIndexes } = this.state;
    if (index1 > index2) {
      indexswap = index1;
      index1 = index2;
      index2 = indexswap;
    }
    for (let i = index1; i <= index2; i++) {
      if (data[i].players >= this.state.maxCap && !clickedIndexes.includes(i)) {
        if (!hoveredIndexes.includes(i) && flag) {
          indexes.push(i);
        } else if (
          this.state.clicks !== 2 &&
          hoveredIndexes.includes(i) &&
          !flag
        ) {
          indexes.push(i);
        }
      }
    }
    return indexes.length === 0;
  }

  incrementPlayers = (updatedData, indices) => {
    indices.forEach((index) => {
      if (index >= 0 && index < updatedData.length) {
        const currentPlayers = updatedData[index].players;
        updatedData[index] = {
          ...updatedData[index],
          players: currentPlayers + 1,
        };
      }
    });
  };

  decrementPlayers = (updatedData, indices) => {
    indices.forEach((index) => {
      if (index >= 0 && index < updatedData.length) {
        const currentPlayers = updatedData[index].players;
        updatedData[index] = {
          ...updatedData[index],
          players: Math.max(0, currentPlayers - 1),
        };
      }
    });
  };

  incrementPlayersInRange = (
    updatedData,
    originalStartIndex,
    originalEndIndex
  ) => {
    const startIndex = Math.min(originalStartIndex, originalEndIndex);
    const endIndex = Math.max(originalStartIndex, originalEndIndex);

    for (let i = startIndex + 1; i < endIndex; i++) {
      if (i !== originalStartIndex) {
        updatedData[i].players = Math.min(
          updatedData[i].players + 1,
          this.state.maxCap
        );
      }
    }
  };

  decrementPlayersInRange = (
    updatedData,
    originalStartIndex,
    originalEndIndex
  ) => {
    const startIndex = Math.min(originalStartIndex, originalEndIndex);
    const endIndex = Math.max(originalStartIndex, originalEndIndex);

    for (let i = startIndex + 1; i < endIndex; i++) {
      updatedData[i].players = Math.max(updatedData[i].players - 1, 0);
    }
  };

  handleClick = (payload, index) => {
    const { clickedIndexes, clicks } = this.state;
    let newClickedIndexes = [...clickedIndexes];
    let message = "";
    let newClicks = clicks;
    let updatedData = this.state.data;
    let newStartTime = "";
    let newEndTime = "";
    switch (clicks) {
      case 0:
        if (payload.players !== 12) {
          newClickedIndexes = [index, index];
          this.incrementPlayers(updatedData, [index]);
          newStartTime = this.state.data[index].name;
          newEndTime = this.state.data[index + 1].name;
          newClicks++;
        } else {
          message = "invalid timeslot selection";
        }
        break;
      case 1:
        if (newClickedIndexes.includes(index)) {
          // If the clicked index is already selected, revert the players count in that range
          this.decrementPlayers(updatedData, [index]);
          newClickedIndexes = [];
          newStartTime = "";
          newEndTime = "";
          newClicks = 0;
        } else if (this.validTimeSlot(newClickedIndexes[0], index, false)) {
          newClickedIndexes = [newClickedIndexes[0], index];
          const startTimeIndex = Math.min(...newClickedIndexes);
          const endTimeIndex = Math.max(...newClickedIndexes) + 1;
          newStartTime = this.state.data[startTimeIndex].name;
          newEndTime = this.state.data[endTimeIndex].name;
          this.incrementPlayersInRange(
            updatedData,
            newClickedIndexes[0],
            index
          );
          this.incrementPlayers(updatedData, [index]);
          newClicks++;
        } else {
          message = "invalid timeslot selection";
          this.setState({ hoveredIndexes: [] });
        }
        break;
      default:
        // Revert players for the entire range when resetting
        if (newClickedIndexes.length === 2) {
          const start = Math.min(...newClickedIndexes);
          const end = Math.max(...newClickedIndexes);
          this.decrementPlayersInRange(updatedData, start - 1, end + 1);
          newStartTime = "";
          newEndTime = "";
        }
        newClickedIndexes = [];
        newClicks = 0;
        this.setState({ hoveredIndexes: [] });
        newStartTime = "";
        newEndTime = "";
    }

    this.setState(
      {
        clickedIndexes: newClickedIndexes,
        clicks: newClicks,
        message,
        data: updatedData,
        startTime: newStartTime,
        endTime: newEndTime,
      },
      () => {
        console.log("clicked: " + newClickedIndexes);
      }
    );

    if (message) {
      setTimeout(() => {
        this.setState({ message: "" });
      }, 5000);
    }
  };

  onHover = (hoveredIndex) => {
    const { clickedIndexes } = this.state;

    if (!clickedIndexes.length || this.state.clicks >= 2) return;

    const lastIndex = clickedIndexes[clickedIndexes.length - 1];
    const [start, end] =
      hoveredIndex > lastIndex
        ? [lastIndex + 1, hoveredIndex]
        : [hoveredIndex, lastIndex - 1];

    const missingIndices = [];
    for (let i = start; i <= end; i++) {
      missingIndices.push(i);
    }
    this.setState({ hoveredIndexes: missingIndices });
  };

  fetchBookingData = async () => {
    const { locationID, courtNumber } = this.props;
    let newDate = this.state.selectedDate;

    newDate.setHours(10, 0, 0, 0);

    const selectedDate = newDate;

    try {
      console.log(
        "location: ",
        locationID,
        "date: ",
        selectedDate,
        "court: ",
        courtNumber
      );
      const updatedData = await getBookings(
        locationID,
        selectedDate,
        courtNumber
      );
      const transformedData = updatedData.map((item) => ({
        ...item,
        players: item.players.length,
      }));
      this.setState(
        {
          data: transformedData,
          numberOfBars: transformedData.length,
        },
        () => {
          this.updateChartDimensions();
        }
      );
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  updateChartDimensions = () => {
    if (this.windowRef.current) {
      const newWidth = this.windowRef.current.offsetWidth;
      const newHeight = this.windowRef.current.offsetHeight;
      const chartControlsWidth = newWidth * 0.9;
      const chartControlsHeight = newHeight * 0.55;

      this.setState(
        {
          chartControlsHeight,
          chartControlsWidth,
          chartHeight: chartControlsHeight * 0.97,
          chartWidth: chartControlsWidth * this.state.numberOfBars * 0.1,
        },
        () => {
          this.setState({
            barSize: chartControlsWidth * 0.09,
            rightGap: chartControlsWidth * 0.1,
          });
        }
      );
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateChartDimensions);

    this.fetchBookingData();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateChartDimensions);
  }

  handleRightArrowClick = () => {
    const container = this.scrollContainerRef.current;
    if (container) {
      const scrollAmount = this.state.barSize * 3;
      container.scrollLeft += scrollAmount;
    }
  };

  handleLeftArrowClick = () => {
    const container = this.scrollContainerRef.current;
    if (container) {
      const scrollAmount = this.state.barSize * 3;
      container.scrollLeft -= scrollAmount;
    }
  };

  calculateScrollAmount = () => {
    const itemWidth = this.state.chartWidth / this.state.itemsPerPage;
    return itemWidth * 10;
  };

  handleSubmitClick = async () => {
    const { closeTimeGrid, locationID, courtNumber, confirmedBookingDate } =
      this.props;
    this.setState({ isLoading: true });
    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const bookingPromise = await orderBooking(
        this.state.selectedDate,
        this.state.startTime,
        this.state.endTime,
        courtNumber,
        locationID,
        this.state.maxCap,
        this.state.user.email
      );
      await minLoadingTime;
      confirmedBookingDate(
        this.state.selectedDate,
        this.state.startTime,
        this.state.endTime
      );
      closeTimeGrid();
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      currentPage,
      itemsPerPage,
      clickedIndexes,
      hoveredIndexes,
      data,
      message,
      barSize,
      maxCap,
    } = this.state;
    const { closeTimeGrid, locationID, courtNumber } = this.props;

    return (
      <div
        className="dim-background"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="window" ref={this.windowRef} style={{ width: "80%" }}>
          <button className="close-button" onClick={closeTimeGrid}>
            X
          </button>
          <div className="time-container">
            <TimePicker
              data={data}
              handleTimeSelect={this.handleTimeSelect}
              defaultStartTime={this.state.startTime}
              defaultEndTime={this.state.endTime}
              clicks={this.state.clicks}
              handleDateChange={this.handleDateChange}
            />
          </div>
          <div
            className="chart-controls"
            ref={this.chartControlsRef}
            style={{
              width: this.state.chartControlsWidth,
              height: this.state.chartControlsHeight,
            }}
          >
            <button
              className="arrow-button"
              onClick={this.handleLeftArrowClick}
              disabled={currentPage === 0}
            >
              &lt;
            </button>
            <div
              className="chart-scroll-container"
              ref={this.scrollContainerRef}
              style={{
                width: this.state.chartControlsWidth,
                height: this.state.chartControlsHeight,
                overflowX: "auto",
              }}
            >
              <ResponsiveContainer
                width={this.state.chartWidth}
                height={this.state.chartHeight}
              >
                <BarChart
                  data={this.state.data}
                  margin={{ bottom: 30, left: 20 }}
                >
                  <YAxis
                    domain={[0, maxCap]}
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={<CustomTick barSize={barSize} />}
                    axisLine={false}
                    tickSize={20}
                  />
                  <Bar
                    dataKey="players"
                    shape={(props) => {
                      if (props.index === this.state.data.length - 1)
                        return null;
                      return (
                        <CustomBar
                          {...props}
                          width={barSize}
                          onClick={this.handleClick}
                          chartHeight={this.state.chartHeight}
                          chartWidth={this.state.chartWidth}
                          num_bars={this.state.numberOfBars}
                          max_cap={maxCap}
                          index={props.index}
                          clickedIndexes={clickedIndexes}
                          hoveredIndexes={hoveredIndexes}
                          onHover={this.onHover}
                        />
                      );
                    }}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        cursor="pointer"
                        fill={this.getFillColor(entry.players)}
                        key={`cell-${index}`}
                      />
                    ))}
                  </Bar>
                  {this.state.chartHeight && (
                    <svg
                      x={0}
                      y={this.state.chartHeight - 60}
                      style={{ position: "relative", zIndex: 0 }}
                    >
                      <rect
                        width={this.state.chartWidth}
                        height={10}
                        fill="#b0c4de"
                        rx={5} // roundness value for x-axis
                        ry={5} // roundness value for y-axis
                      />
                    </svg>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <button
              onClick={this.handleRightArrowClick}
              disabled={
                currentPage >= Math.ceil(data.length / itemsPerPage) - 1
              }
            >
              &gt;
            </button>
          </div>
          <button className="submit-button" onClick={this.handleSubmitClick}>
            {this.state.isLoading ? <div className="loader"></div> : "Submit"}
          </button>
          {message && <div className="message">{message}</div>}
        </div>
      </div>
    );
  }
}
