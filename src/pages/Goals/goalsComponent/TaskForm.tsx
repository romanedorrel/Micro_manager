import type React from "react";

type TaskFormProp = {
  taskTitle: string;
  taskDescription: string;
  editingTaskId: string | null;
  onDescriptionChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
};

const TaskForm = ({
  taskTitle,
  taskDescription,
  onDescriptionChange,
  onTitleChange,
  editingTaskId,
  onSubmit,
  onCancelEdit,
}: TaskFormProp) => {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={taskTitle}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <textarea
        placeholder="Task description"
        value={taskDescription}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />

      <button type="submit">{editingTaskId ? "Save Task" : "Add Task"}</button>
      <button type="button" onClick={onCancelEdit}>
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
