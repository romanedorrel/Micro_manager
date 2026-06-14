import TaskCard from "./TaskCard";
import type { Task } from "../../../types/taskTypes";

type Props = {
  tasks: Task[];
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete }: Props) => {
  return (
    <div className="task-list">
      {tasks.length === 0 && <p>No tasks added for this goal yet.</p>}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={() => onToggleComplete(task)}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
