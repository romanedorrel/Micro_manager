import React from "react";
import CalendarHeader from "./Components/CalendarHeader";
import WeekView from "./Components/WeekView";
import Detailed from "./Components/Detailed";

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
    <main className="calendar-page">
      <CalendarHeader />

      <section className="calendar-layout">
        <WeekView weekData={weekData} />

        <Detailed />
      </section>
    </main>
  );
};

export default CalendarPage;
