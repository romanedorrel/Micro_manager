import type { Goal } from "../../../types/goalTypes";
import { CheckIcon } from "lucide-react";
type CompletedCardProps = {
  goal: Goal;
  onClick?: () => void;
};
const CompletedCard = ({ goal, onClick }: CompletedCardProps) => {
  return (
    <button type="button" className="completed-goal-card" onClick={onClick}>
      <div className="completed-goal-content">
        <h3>
          <CheckIcon size={20} />
          <span>{goal.title}</span>
          <span className="completed-goal-badge">Done</span>
        </h3>

        {goal.description && (
          <p className="completed-goal-description">{goal.description}</p>
        )}
      </div>
    </button>
  );
};

export default CompletedCard;
