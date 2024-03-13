import React, { PureComponent } from "react";

export default class CustomTick extends PureComponent {
  render() {
      const { x, y, payload, barSize } = this.props;
      
    // Adjust these values to move the tick line and label
    const dx = -barSize / 2; // horizontal offset, moving left by half the bar size
    const dy = 15; // vertical offset for the label

    return (
      <g transform={`translate(${x},${y})`}>
        {/* Draw the tick line */}
        <line x1={dx} y1={0} x2={dx} y2={-20} stroke="black" />

        {/* Render the label */}
        <text
          x={dx}
          y={dy}
          dy={0}
          textAnchor="middle" // Adjust text anchor to "middle" for centered alignment
          fill="#666"
          // Remove transform if rotation is not needed, or adjust as needed
        >
          {payload.value}
        </text>
      </g>
    );
  }
}
