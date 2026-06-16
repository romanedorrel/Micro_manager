import type { Task } from "../../../types/taskTypes";

type TaskCardProps = {
  task: Task;
};

const CalendarTaskCard = ({ task }: TaskCardProps) => {
  return (
    <article className="calendar-task-card">
      <p>{task.title}</p>
      {task.status === "completed" && <span>Done</span>}
    </article>
  );
};

export default CalendarTaskCard;
