import { useState } from "react";
import CalendarHeader from "./calendarComponents/CalendarHeader";
import WeekView from "./calendarComponents/WeekView";
import Detailed from "./calendarComponents/Detailed";
import "./calendar.css";

type Task = {
  title: string;
  time: string;
  priority: "High" | "Medium" | "Low";
};

type WeekDay = {
  day: string;
  date: string;
  tasks: Task[];
};

const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState<WeekDay | null>(null);
  const weekData: WeekDay[] = [
    {
      day: "Mon",
      date: "May 25",
      tasks: [
        {
          title: "Build calendar layout",
          time: "9:00 PM",
          priority: "High",
        },
        {
          title: "Style task cards",
          time: "10:30 PM",
          priority: "Medium",
        },
      ],
    },
    {
      day: "Tue",
      date: "May 26",
      tasks: [
        {
          title: "Create week grid",
          time: "8:00 PM",
          priority: "High",
        },
      ],
    },
    {
      day: "Wed",
      date: "May 27",
      tasks: [],
    },
    {
      day: "Thu",
      date: "May 28",
      tasks: [
        {
          title: "Design overview page",
          time: "9:30 PM",
          priority: "Low",
        },
      ],
    },
    {
      day: "Fri",
      date: "May 29",
      tasks: [],
    },
    {
      day: "Sat",
      date: "May 30",
      tasks: [],
    },
    {
      day: "Sun",
      date: "May 31",
      tasks: [],
    },
  ];

  return (
    <main className={`calendar-page ${selectedDay ? "has-detail" : ""}`}>
      <section className="calendar-card">
        <CalendarHeader />
        <WeekView weekData={weekData} setSelectedDay={setSelectedDay} />
      </section>
      {selectedDay && <Detailed selectedDay={selectedDay} />}
    </main>
  );
};

export default CalendarPage;
