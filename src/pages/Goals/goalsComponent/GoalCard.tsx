import type { Goal } from "../../../types/goalTypes";

type GoalCardProps = {
  goal: Goal;
  onClick?: () => void;
};

const GoalCard = ({ goal, onClick }: GoalCardProps) => {
  const icon =
    goal.priority === "high" ? "🔥" : goal.priority === "medium" ? "📌" : "🎯";

  return (
    <button type="button" className="goal-card" onClick={onClick}>
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
        {goal.deadline && (
          <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
        )}

        {goal.priority && <span>{goal.priority} priority</span>}

        {goal.effort && <span>{goal.effort} effort</span>}
      </div>
    </button>
  );
};

export default GoalCard;
