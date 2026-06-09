import { useState, useEffect } from "react";
import TodoCard from "../components/TodoCard";
import { getTasks, updateTask } from "../services/tasksApi";
import type { Task } from "../types/taskTypes";
import { useAuth } from "../context/AuthContext";

const Today = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { accessToken } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleCheck = async (task: Task) => {
    if (!accessToken) return;

    const newStatus = task.status === "completed" ? "pending" : "completed";

    try {
      const updated = await updateTask(
        task.id,
        { status: newStatus },
        accessToken,
      );
      setTasks((currentTasks) =>
        currentTasks.map((t) => (t.id === task.id ? updated : t)),
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };
  useEffect(() => {
    if (!accessToken) return;
    const fetchTasks = async () => {
      try {
        const todayList = await getTasks(accessToken);
        setTasks(todayList);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, [accessToken]);

  return (
    <>
      <div>
        {" "}
        <h2>Today</h2>
        <p>{today}</p>
        <div className="outer-container">
          {tasks.map((task) => {
            return (
              <TodoCard
                key={task.id}
                id={task.id}
                time=""
                task={task.title}
                category="General"
                checked={task.status === "completed"}
                onCheck={() => handleCheck(task)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Today;
