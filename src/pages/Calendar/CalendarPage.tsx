import { useState, useEffect } from "react";
import CalendarHeader from "./calendarComponents/CalendarHeader";
import WeekView from "./calendarComponents/WeekView";
import Detailed from "./calendarComponents/Detailed";
import "./calendar.css";
import { getTasks } from "../../services/tasksApi";
import { useAuth } from "../../context/AuthContext";
import type { Task } from "../../types/taskTypes";

type WeekDay = {
  day: string;
  date: string;
  tasks: Task[];
};

const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState<WeekDay | null>(null);
  const [groupedTasks, setGroupedTasks] = useState<Map<string, Task[]>>(
    new Map(),
  );
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => {
      const date = new Date(prev);
      date.setDate(date.getDate() - 7);
      return date;
    });
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => {
      const date = new Date(prev);
      date.setDate(date.getDate() + 7);
      return date;
    });
  };

  const handleToday = () => {
    setCurrentWeek(new Date());
  };

  const { accessToken } = useAuth();
  useEffect(() => {
    if (!accessToken) return;

    const fetchAndGroupTasks = async () => {
      try {
        const fetchedTasks = await getTasks(accessToken);
        console.log("fetchedTasks", fetchedTasks);
        const grouped = new Map<string, Task[]>();

        for (const task of fetchedTasks) {
          if (!task.scheduled_date) continue;

          if (!grouped.has(task.scheduled_date)) {
            grouped.set(task.scheduled_date, [task]);
          } else {
            grouped.get(task.scheduled_date)?.push(task);
          }
        }
        setGroupedTasks(grouped);
        console.log(grouped);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchAndGroupTasks();
  }, [accessToken]);

  return (
    <main className="calendar-page has-detail">
      <section className="calendar-card">
        <CalendarHeader
          currentWeek={currentWeek}
          handlePrevWeek={handlePrevWeek}
          handleNextWeek={handleNextWeek}
          handleToday={handleToday}
        />
        <div className="calendar-wrapper">
          <WeekView
            currentWeek={currentWeek}
            weekData={groupedTasks}
            setSelectedDay={setSelectedDay}
          />
        </div>
      </section>
      <Detailed selectedDay={selectedDay} />
    </main>
  );
};

export default CalendarPage;
