import { useEffect, useState } from "react";
import { getGoalById } from "../../services/goalApi";
import { useAuth } from "../../context/AuthContext";
import type { Goal } from "../../types/goalTypes";
import type { Task } from "../../types/taskTypes";
import { generateTasks } from "../../services/aiApi";
import { useParams } from "react-router-dom";
import {
  getTasksByGoalId,
  updateTask,
  createTask,
  deleteTask,
} from "../../services/tasksApi";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./goals.css";
import GoalIDHeader from "./goalsComponent/GoalIDHeader";
import TaskForm from "./goalsComponent/TaskForm";
import TaskList from "./goalsComponent/TaskList";
import GeneratedTaskList from "./goalsComponent/GeneratedTaskList";

type GeneratedTask = {
  title: string;
  description: string;
};

const GoalIdPage = () => {
  const [goal, setGoal] = useState<Goal>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
  const [generating, setGenerating] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { goalId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Evenly distribute generated tasks between today and the goal deadline
  // while preserving their original order.
  const scheduleTasks = (tasks: GeneratedTask[], deadline: string) => {
    const today = new Date();
    const endDate = new Date(deadline);

    const totalDays =
      Math.floor((endDate.getTime() - today.getTime()) / (3600000 * 24)) + 1;

    return tasks.map((task, index) => {
      const dayOffset = Math.floor((index * totalDays) / tasks.length);

      const scheduledDate = new Date(today);
      scheduledDate.setDate(today.getDate() + dayOffset);

      return {
        ...task,
        scheduled_date: formatLocalDate(scheduledDate),
      };
    });
  };

  const handleGenerateTasks = async () => {
    if (!accessToken || !goal) return;

    try {
      setGenerating(true);

      const data = await generateTasks(goal, accessToken);

      setGeneratedTasks(data.tasks);
    } catch (error) {
      console.error("Failed to generate AI tasks", error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmitTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken || !goalId || !goal || !taskTitle.trim()) return;

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
            scheduled_date: new Date().toISOString().split("T")[0],
          },
          accessToken,
        );

        setTasks((prevTasks) => [...prevTasks, newTask]);
      }

      setTaskTitle("");
      setTaskDescription("");
      setShowTaskForm(false);
    } catch (error) {
      console.error("Failed to save task", error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskDescription(task.description || "");
    setShowTaskForm(true);
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

  const handleSaveGeneratedTasks = async () => {
    if (!accessToken || !goalId || !goal) return;

    try {
      const scheduledTasks = scheduleTasks(generatedTasks, goal.deadline);
      await Promise.all(tasks.map((task) => deleteTask(task.id, accessToken)));
      const savedTasks = await Promise.all(
        scheduledTasks.map((task) =>
          createTask(
            {
              goal_id: goalId,
              title: task.title,
              description: task.description,
              status: "pending",
              scheduled_date: task.scheduled_date,
            },
            accessToken,
          ),
        ),
      );
      setTasks(savedTasks);
      setGeneratedTasks([]);
    } catch (error) {
      console.error("Failed to save generated tasks", error);
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
      <GoalIDHeader goal={goal} />

      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      {!showTaskForm && (
        <button type="submit" onClick={() => setShowTaskForm(true)}>
          Add Task
        </button>
      )}

      {showTaskForm && (
        <TaskForm
          taskTitle={taskTitle}
          taskDescription={taskDescription}
          editingTaskId={editingTaskId}
          onTitleChange={setTaskTitle}
          onDescriptionChange={setTaskDescription}
          onSubmit={handleSubmitTask}
          onCancelEdit={() => {
            setEditingTaskId(null);
            setTaskTitle("");
            setTaskDescription("");
            setShowTaskForm(false);
          }}
        />
      )}
      <GeneratedTaskList
        generatedTasks={generatedTasks}
        generating={generating}
        onGenerate={handleGenerateTasks}
        onSaveGeneratedTask={handleSaveGeneratedTasks}
      />
    </div>
  );
};

export default GoalIdPage;
