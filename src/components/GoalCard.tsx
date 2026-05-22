import React from "react";
import ProgressCircle from "./ProgressCircle";
type Goal = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  progress: number; // Used to show progress towards the goal
  completedTasks: number; //  Number of tasks completed towards the goal
  totalTasks: number; // Total number of tasks for the goal
  status: "On Track" | "At Risk" | "Off Track"; // Status of the goal
  estimatedHours?: number; // Hours remaining to complete the goal
  icon?: React.ReactNode; // Optional icon for the goal
  onClick?: () => void; // Click handler for the card
};

type GoalCardProps = {
  goal: Goal;
};

export const GoalCard = ({ goal }: GoalCardProps) => {
  return (
    <div onClick={goal.onClick} className="goal-card">
      <div className="goal-top">
        <div className="goal-main">
          <div className="goal-icon-wrapper">
            {goal.icon && <div className="goal-icon">{goal.icon}</div>}
          </div>
          <div className="goal-main-column">
            <h3>{goal.title}</h3>
            <p className="goal-description">{goal.description}</p>
            <div className="goal-meta">
              <span className="goal-status"> {goal.status}</span>
              <span className="goal-due-date">
                Due {goal.dueDate.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <ProgressCircle progress={goal.progress} />
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${goal.progress}%` }}
        ></div>
      </div>
      <div className="goal-footer">
        <div className="goal-footer-item">
          <strong>
            {goal.completedTasks}/{goal.totalTasks}
          </strong>
          <span>Tasks</span>
        </div>
        <div className="goal-footer-item">
          <strong>Estimated Hours: {goal.estimatedHours}</strong>
          <span>Est. Remaining</span>
        </div>
        <div className="goal-footer-item">
          <strong>5</strong>
          <span>Days on Track</span>
        </div>
      </div>
    </div>
  );
};
