import { Calendar, ChevronRight, Flag, SignalHigh } from "lucide-react";
import type { Goal } from "../../../types/goalTypes";

type GoalCardProps = {
  goal: Goal;
  onClick?: () => void;
  checked?: boolean;
  onCheck?: (id: string) => void;
};

const GoalCard = ({ goal, onClick, checked, onCheck }: GoalCardProps) => {
  const icon =
    goal.priority === "high" ? "🔥" : goal.priority === "medium" ? "📌" : "🎯";

  const formatDateDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split("-");

    return `${month}/${day}/${year}`;
  };
  return (
    <article
      className="goal-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="goal-card-main">
        <div className="goal-icon">{icon}</div>

        <div className="goal-card-body">
          <div className="goal-title-group">
            <h3>{goal.title}</h3>

            {goal.description && (
              <p className="goal-description">{goal.description}</p>
            )}
          </div>

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

      <div className="goal-complete-control">
        <label aria-label={`Mark ${goal.title} as complete`}>
          <input
            type="checkbox"
            checked={checked}
            onClick={(e) => e.stopPropagation()}
            onChange={() => onCheck?.(goal.id)}
          />
        </label>
      </div>
      <ChevronRight className="goal-card-arrow" size={28} aria-hidden="true" />
    </article>
  );
};

export default GoalCard;
