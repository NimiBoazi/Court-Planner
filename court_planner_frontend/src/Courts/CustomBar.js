import React, { useState } from "react"; 

function CustomBar(props) {
  const {
    fill,
    x,
    y,
    width,
    height,
    payload,
    onClick,
    num_bars,
    max_cap,
    chartHeight,
    chartWidth,
    index,
    clickedIndexes,
    hoveredIndexes,
    clicks
  } = props;

  const [isHovered, setHovered] = useState(false);

 const isActive = clickedIndexes.includes(index);
  const isHoveredInActiveSelection = hoveredIndexes.includes(index);
  const lightGrey = "rgba(211, 211, 211, 0.5)";

  const rectStyle = {
    fill:
      isHovered &&
      clicks === 2 &&
      !hoveredIndexes.includes(index) &&
      !clickedIndexes.includes(index)
        ? "lightgrey" // Light grey when hovered, clicks = 2, and index is not in hoveredIndexes or clickedIndexes
        : isHovered ||
          hoveredIndexes.includes(index) ||
          clickedIndexes.includes(index)
        ? "rgba(144, 238, 144, 0.5)" // Green for hovered or active selection
        : "transparent", // Transparent otherwise
  };



  // Define a threshold for the height
  const heightThreshold = 20;
  const isBarTooSmall = height < heightThreshold;
  return (

    
    <g>
      {/* Render the actual bar */}
      <path
        d={`M ${x},${y + height} 
        L ${x},${y + 5} 
        Q ${x},${y} ${x + 5},${y} 
        L ${x + width - 5},${y} 
        Q ${x + width},${y} ${x + width},${y + 5} 
        L ${x + width},${y + height} 
        Z`}
        fill={fill}
      />

      {/* Render the text either inside or above the bar based on its height */}
      <text
        x={x + width / 2} 
        y={isBarTooSmall ? y - 5 : y + 15} 
        textAnchor="middle" 
        fill={"black"} 
        fontSize="10" 
        fontFamily="Arial"
      >
        {payload.players}/{max_cap} spots
      </text>

      {/* Transparent rect for clickable area */}
      <rect
        className="backround-bar"
        x={x - 2*(width / num_bars)}
        y={-25}
        width={(width + ((chartWidth - (width * num_bars)) / num_bars - 2))}
        //width={width + (2 * width) / num_bars + 0.5}
        height={(chartHeight / 100) * 90.5}
        style={rectStyle}
        onMouseEnter={() => {
          if (props.onHover) {
            props.onHover(index);
          }
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          onClick(payload, index);
        }}
      />
    </g>
  );
}

export default CustomBar;
