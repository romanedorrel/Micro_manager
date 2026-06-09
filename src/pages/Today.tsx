import { useState, useEffect } from "react";
import TodoCard from "../components/TodoCard";
import { Plus } from "lucide-react";
import { getTasks } from "../services/tasksApi";
import type { Task } from "../types/taskTypes";
import { useAuth } from "../context/AuthContext";

const Today = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const { accessToken } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSubmit = () => {
    if (value.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: value,
      description: "",
      status: "pending",
      goal_id: "",
    };
    setTasks([...tasks, newTask]);
    setInputVisible(false);
    setValue("");
  };

  // const handleDelete = (target: number) => {
  //   const updatedList = todos.filter((_, index) => index !== target);
  //   setTodos(updatedList);
  // };

  const handleCheck = (target: number) => {
    const updated = tasks.map((task, index) =>
      index == target
        ? {
            ...task,
            status: task.status === "pending" ? "completed" : "pending",
          }
        : task,
    );
    setTasks(updated);
  };
  useEffect(() => {
    if (!accessToken) return;
    const getTodos = async () => {
      try {
        const todayList = await getTasks(accessToken);
        setTasks(todayList);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    getTodos();
  }, [accessToken]);

  return (
    <>
      <div>
        {" "}
        <h2>Today</h2>
        <p>{today}</p>
        <div className="outer-container">
          {tasks.map((task, index) => {
            return (
              <TodoCard
                id={index}
                time={new Date().toLocaleTimeString()}
                task={task.title}
                category="General"
                checked={task.status === "completed"}
                onCheck={() => handleCheck(index)}
              />
            );
          })}
          <div>
            <button
              onClick={() => setInputVisible(true)}
              className="add-task-btn"
            >
              <Plus size={14} /> Add Task
            </button>{" "}
            <br />
            {inputVisible && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "12px",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter a task"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="add-task-input"
                />
                <button onClick={handleSubmit} className="add-task-btn">
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Today;
