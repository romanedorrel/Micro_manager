import DayColumn from "./DayColumn";
import type { Task } from "../../../types/taskTypes";

type WeekDay = {
  day: string;
  date: string;
  tasks: Task[];
};

type WeekGridProps = {
  weekData: Map<string, Task[]>;
  onSelectedDay: (day: WeekDay) => void;
};

// Creates an array representing the current week (7 days).
// Each day starts with an empty tasks array that will be populated later.
const getCurrentWeek = (): WeekDay[] => {
  // Get the current date
  const today = new Date();

  // Create a copy of today's date so we don't modify the original.
  const startOfWeek = new Date(today);

  // Move back to Sunday, the first day of the current week
  // by substracting the number of days since the start of the week.
  startOfWeek.setDate(today.getDate() - today.getDay());

  // Create an array of the 7 days in the current week.
  return Array.from({ length: 7 }, (_, i) => {
    // Create a copy of the start of the week date.
    const date = new Date(startOfWeek);
    // Move to the i-th day of the week.
    date.setDate(startOfWeek.getDate() + i);

    return {
      // Return the day information in readable format such as "Mon", "Tue", etc.
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      //Format date to match schedule_date format.
      date: date.toISOString().split("T")[0],
      // Initialize tasks array. tasks are populated later.
      tasks: [],
    };
  });
};

const WeekGrid = ({ weekData, onSelectedDay }: WeekGridProps) => {
  // Generate the current week's seven days.
  const weekDays = getCurrentWeek();

  return (
    <section className="week-grid">
      {weekDays.map((day) => {
        //Look up tasks scheduled for this date
        const tasksForDay = weekData.get(day.date) || [];
        return (
          <DayColumn
            key={day.date}
            //Keep the day information with the tasks for this date
            day={{ ...day, tasks: tasksForDay }}
            onSelectedDay={onSelectedDay}
          />
        );
      })}
    </section>
  );
};

export default WeekGrid;
