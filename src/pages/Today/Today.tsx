import { useState, useEffect } from "react";
import TodoCard from "../../components/TodoCard";
import { getTasks, updateTask } from "../../services/tasksApi";
import type { Task } from "../../types/taskTypes";
import { useAuth } from "../../context/AuthContext";
import FocusCard from "./TodayComponents/FocusCard";
import FocusTip from "./TodayComponents/FocusTip";
const Today = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { accessToken } = useAuth();

  const displayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  const todayDate = new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter((task) => task.scheduled_date === todayDate);
  const focusTask = todayTasks[0];

  const upcomingTask = tasks.find(
    (task) =>
      task.scheduled_date &&
      task.scheduled_date > todayDate &&
      task.status === "pending",
  );

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
      <div className="today-page">
        <header className="today-header">
          <h2>{greeting}, Romane</h2>
          <p>{displayDate}</p>
        </header>
        <section className="today-main">
          <FocusCard task={focusTask} />
          <div className="outer-container">
            <h3>Today's Plan</h3>
            {todayTasks.length > 0 ? (
              todayTasks.map((task) => (
                <TodoCard
                  key={task.id}
                  id={task.id}
                  time=""
                  task={task.title}
                  category="General"
                  checked={task.status === "completed"}
                  onCheck={() => handleCheck(task)}
                />
              ))
            ) : (
              <p className="empty-state">
                No tasks planned for today. One step at a time.
              </p>
            )}
          </div>
        </section>
        <aside className="today-sidebar">
          <FocusTip />
          <div className="up-next">
            <h3>Upcoming</h3>
            <p>
              {upcomingTask?.title ||
                "You're all caught up. Small progress still counts."}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Today;
