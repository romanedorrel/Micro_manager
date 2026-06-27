import type { Goal } from "../../../types/goalTypes";
import { Calendar, Flag, SignalHigh } from "lucide-react";
type Prop = {
  goal: Goal;
};
const GoalIDHeader = ({ goal }: Prop) => {
  const icon =
    goal.priority === "high" ? "🔥" : goal.priority === "medium" ? "📌" : "🎯";
  const formatDateDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split("-");

    return `${month}/${day}/${year}`;
  };

  return (
    <div className="goal-detail-hero">
      <div className="goal-icon goal-detail-icon">{icon}</div>
      <div className="goal-detail-copy">
        <h1>{goal.title}</h1>
        <p>{goal.description}</p>
        <div className="goal-card-meta">
          {goal.deadline && (
            <span>
              <Calendar size={14} /> Due {formatDateDisplay(goal.deadline)}
            </span>
          )}
          {goal.priority && (
            <span>
              <Flag size={14} /> {goal.priority} priority
            </span>
          )}
          {goal.effort && (
            <span>
              <SignalHigh size={14} /> {goal.effort} effort
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalIDHeader;
