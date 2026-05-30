type Task = {
  title: string;
  time: string;
  priority: "High" | "Medium" | "Low";
};

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className={`task-card priority-${task.priority.toLowerCase()}`}>
      <div className="task-card-top">
        <span className="task-time">{task.time}</span>

        <span className="task-priority">{task.priority}</span>
      </div>

      <h4 className="task-title">{task.title}</h4>
    </div>
  );
};

export default TaskCard;
