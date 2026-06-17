import type { Task } from "../../../types/taskTypes";
type FocusCardProps = {
  task?: Task;
};
const FocusCard = ({ task }: FocusCardProps) => {
  return (
    <div className="focus-card">
      <h3>Today's Focus</h3>
      <p>{task?.title || "Start with this."}</p>
      <h3>Why This Task</h3>
      <ul>
        <li>It keeps the next step clear.</li>
        <li>It helps you move forward gently.</li>
      </ul>
    </div>
  );
};

export default FocusCard;
