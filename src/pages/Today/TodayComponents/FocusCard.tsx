import type { Task } from "../../../types/taskTypes";
type FocusCardProps = {
  task?: Task;
};
const FocusCard = ({ task }: FocusCardProps) => {
  return (
    <div className="focus-card">
      <h3>Today's Focus</h3>
      <p>{task?.title || "No focus task for today."}</p>
      <h3>Why This Task?</h3>
      <ul>
        <li>It keeps you on track with your goal.</li>
        <li>It Unlocks future Steps.</li>
      </ul>
    </div>
  );
};

export default FocusCard;
