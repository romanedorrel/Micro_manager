import { useEffect, useState } from "react";
import { getGoalById } from "../../services/goalApi";
import { useAuth } from "../../context/AuthContext";
import type { Goal } from "../../types/goalTypes";
import type { Task } from "../../types/taskTypes";
import { useParams } from "react-router-dom";
import {
  getTasksByGoalId,
  updateTask,
  createTask,
  deleteTask,
} from "../../services/tasksApi";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaskCard from "./goalsComponent/TaskCard";

const GoalIdPage = () => {
  const [goal, setGoal] = useState<Goal>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const { goalId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken || !goalId || !taskTitle.trim()) return;

    try {
      if (editingTaskId) {
        const updatedTask = await updateTask(
          editingTaskId,
          {
            title: taskTitle,
            description: taskDescription,
          },
          accessToken,
        );

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editingTaskId ? updatedTask : task,
          ),
        );

        setEditingTaskId(null);
      } else {
        const newTask = await createTask(
          {
            goal_id: goalId,
            title: taskTitle,
            description: taskDescription,
            status: "pending",
          },
          accessToken,
        );

        setTasks((prevTasks) => [...prevTasks, newTask]);
      }

      setTaskTitle("");
      setTaskDescription("");
    } catch (error) {
      console.error("Failed to save task", error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskDescription(task.description || "");
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!accessToken) return;

    try {
      await deleteTask(taskId, accessToken);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    if (!accessToken) return;

    const newStatus = task.status === "completed" ? "pending" : "completed";

    try {
      const updatedTask = await updateTask(
        task.id,
        { status: newStatus },
        accessToken,
      );

      setTasks((prevTasks) =>
        prevTasks.map((currentTask) =>
          currentTask.id === task.id ? updatedTask : currentTask,
        ),
      );
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };
  useEffect(() => {
    if (!goalId || !accessToken) return;

    const fetchGoalDetail = async () => {
      setLoading(true);
      try {
        const [goalData, taskData] = await Promise.all([
          getGoalById(goalId, accessToken),
          getTasksByGoalId(goalId, accessToken),
        ]);
        setGoal(goalData);
        setTasks(taskData);
      } catch (error) {
        console.error("Failed to get tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoalDetail();
  }, [accessToken, goalId]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!goal) {
    return <p>Goal not found.</p>;
  }
  return (
    <div>
      <button onClick={() => navigate("/goals")}>
        <ArrowLeft size={28} />
        Back
      </button>
      <div className="goal_detail_header">
        {" "}
        <h2>{goal.title}</h2>
        <p>{goal.description}</p>
        <div>
          <p>{goal.deadline}</p>
          <p>{goal.priority}</p>
          <p>{goal.effort}</p>
        </div>
        <form className="task-form" onSubmit={handleSubmitTask}>
          <input
            type="text"
            placeholder="Task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <textarea
            placeholder="Task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />

          <button type="submit">
            {editingTaskId ? "Save Task" : "Add Task"}
          </button>

          {editingTaskId && (
            <button
              type="button"
              onClick={() => {
                setEditingTaskId(null);
                setTaskTitle("");
                setTaskDescription("");
              }}
            >
              Cancel
            </button>
          )}
        </form>
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={() => handleToggleComplete(task)}
              onEdit={() => handleEditTask(task)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalIdPage;
