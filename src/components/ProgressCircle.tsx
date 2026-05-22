import React from "react";

type ProgressCircleProps = {
  progress: number; // Progress percentage (0-100)
};
const ProgressCircle = ({ progress }: ProgressCircleProps) => {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  // Example: 75% progress
  return (
    <div className="progress-circle">
      <svg className="progress-ring" viewBox="0 0 116 116">
        <circle className="progress-ring-bg" cx="58" cy="58" r={radius} />
        <circle
          className="progress-ring-fill"
          cx="58"
          cy="58"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />

        <text x="58" y="54" className="progress-text">
          <tspan x="58" dy="0">
            {progress}%
          </tspan>
          <tspan x="58" dy="18" className="progress-label">
            Complete
          </tspan>
        </text>
      </svg>
    </div>
  );
};

export default ProgressCircle;
