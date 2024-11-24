import React from 'react';
import './css/circleProgressBar.css';
const CircleProgressBar = ({ size = 100, strokeWidth = 10, percentage = 50, color = '#4caf50' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius; 
  const offset = circumference - (percentage / 100) * circumference; 

  return (
    <div className="circle-progress-bar" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e6e6e6" 
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color} 
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference} 
          strokeDashoffset={offset} 
          strokeLinecap="round" 
        />
      </svg>
      <div className="percentage-label">{percentage}%</div>

      </div>
  );
};

export default CircleProgressBar;
