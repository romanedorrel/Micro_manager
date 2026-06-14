import type { Goal } from "../../../types/goalTypes";
type Prop = {
  goal: Goal;
};
const GoalIDHeader = ({ goal }: Prop) => {
  return (
    <div>
      <div className="goal_detail_header">
        {" "}
        <h2>{goal.title}</h2>
        <p>{goal.description}</p>
        <div>
          <p>{goal.deadline}</p>
          <p>{goal.priority}</p>
          <p>{goal.effort}</p>
        </div>
      </div>
    </div>
  );
};

export default GoalIDHeader;
