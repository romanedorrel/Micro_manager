import React from "react";
type goal = {
  id: number;
  title: string;
  icon: React.ReactNode;
  completedDate: Date;
};
type CompletedCardProps = {
  goal: goal;
};
const CompletedCard = ({ goal }: CompletedCardProps) => {
  return (
    <>
      <div className="completed-card">
        <div className="completed-card-icon">{goal.icon}</div>
        <div className="completed-card-title">{goal.title}</div>
        <div className="completed-card-date">
          <span>Completed on: {goal.completedDate.toLocaleDateString()}</span>
        </div>
      </div>
    </>
  );
};

export default CompletedCard;
