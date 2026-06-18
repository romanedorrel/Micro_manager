import type { Task } from "../../../types/taskTypes";
import { CheckCircle2 } from "lucide-react";
import calmSpace from "../../../assets/calm_space.png";

type FocusCardProps = {
  task?: Task;
};

const FocusCard = ({ task }: FocusCardProps) => {
  return (
    <div className="focus-card">
      <div className="focus-card-content">
        <h3>Today's Focus</h3>
        <p>{task?.title || "No Task Available"}</p>
        <div className="focus-card-reasons">
          <h4>Why this task?</h4>
          <ul>
            <li>
              <CheckCircle2 size={17} />
              <span>It keeps the next step clear.</span>
            </li>
            <li>
              <CheckCircle2 size={17} />
              <span>It helps you move forward gently.</span>
            </li>
            <li>
              <CheckCircle2 size={17} />
              <span>It creates momentum for the day.</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="focus-card-image" aria-hidden="true">
        <img src={calmSpace} alt="" />
      </div>
    </div>
  );
};

export default FocusCard;
