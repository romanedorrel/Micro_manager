import type { Task } from "../../../types/taskTypes";

type TaskCardProps = {
  task: Task;
  onToggleComplete?: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const TaskCard = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const isCompleted = task.status === "completed";
  return (
    <div className="task-card">
      <div className="task-card-header">
        <label className="task-check-row">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={onToggleComplete}
          />
          <h3
            className={
              task.status === "completed" ? "task-title-completed" : ""
            }
          >
            {task.title}
          </h3>
        </label>

        <span className={`task-status ${task.status}`}>{task.status}</span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {task.estimated_duration && (
        <div className="task-meta">
          <span>Est. Duration: {task.estimated_duration}</span>
        </div>
      )}
      <div className="task-actions">
        <button type="button" onClick={onEdit}>
          Edit
        </button>

        <button type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
