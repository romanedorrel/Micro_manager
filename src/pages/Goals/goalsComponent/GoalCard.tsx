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
      <div className="goal-card-header">
        <div className="goal-icon">{icon}</div>

        <div className="goal-title-group">
          <h3>{goal.title}</h3>

          {goal.description && (
            <p className="goal-description">{goal.description}</p>
          )}
        </div>
      </div>

      <div className="goal-card-meta">
        {goal.deadline && <span>Due {formatDateDisplay(goal.deadline)}</span>}

        {goal.priority && <span>{goal.priority} priority</span>}

        {goal.effort && <span>{goal.effort} effort</span>}
      </div>

      <div
        className="goal-complete-control"
        onClick={(e) => e.stopPropagation()}
      >
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onCheck?.(goal.id)}
          />
          <span>Mark as Complete</span>
        </label>
      </div>
    </article>
  );
};

export default GoalCard;
