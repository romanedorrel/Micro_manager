import DayColumn from "./DayColumn";
import type { Task } from "../../../types/taskTypes";
import type { CSSProperties } from "react";

type WeekDay = {
  day: string;
  date: string;
  tasks: Task[];
};

type WeekGridProps = {
  weekData: Map<string, Task[]>;
  onSelectedDay: (day: WeekDay) => void;
};

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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
      date: formatLocalDate(date),
      // Initialize tasks array. tasks are populated later.
      tasks: [],
    };
  });
};

const timeBlocks = [
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
];

const getTaskAccent = (index: number) => {
  const accents = ["sage", "cream", "mist"];
  return accents[index % accents.length];
};

const getTaskGridStyle = (dayIndex: number, taskIndex: number) =>
  ({
    "--event-column": dayIndex + 2,
    "--event-row": 4 + ((dayIndex + taskIndex * 2) % 10),
    "--event-span": taskIndex % 3 === 1 ? 3 : 2,
  }) as CSSProperties;

const WeekGrid = ({ weekData, onSelectedDay }: WeekGridProps) => {
  // Generate the current week's seven days.
  const weekDays = getCurrentWeek();

  return (
    <section className="week-grid" aria-label="Weekly calendar schedule">
      <div className="week-grid-corner" />
      {weekDays.map((day) => {
        //Look up tasks scheduled for this date
        const tasksForDay = weekData.get(day.date) || [];
        return (
          <DayColumn
            key={day.date}
            //Keep the day information with the tasks for this date
            day={{ ...day, tasks: tasksForDay }}
            columnIndex={weekDays.indexOf(day) + 2}
            onSelectedDay={onSelectedDay}
          />
        );
      })}

      <div className="time-label all-day-label">All day</div>
      {weekDays.map((day, dayIndex) => (
        <button
          className="all-day-cell"
          key={`${day.date}-all-day`}
          style={{ "--cell-column": dayIndex + 2 } as CSSProperties}
          onClick={() =>
            onSelectedDay({ ...day, tasks: weekData.get(day.date) || [] })
          }
        >
          <span>{(weekData.get(day.date) || [])[0]?.title || ""}</span>
        </button>
      ))}

      {timeBlocks.map((time, timeIndex) => (
        <div className="time-row" key={time}>
          <span
            className="time-label"
            style={{ "--time-row": timeIndex + 3 } as CSSProperties}
          >
            {time}
          </span>
          {weekDays.map((day, dayIndex) => (
            <button
              className="time-cell"
              key={`${day.date}-${time}`}
              style={
                {
                  "--time-column": dayIndex + 2,
                  "--time-row": timeIndex + 3,
                } as CSSProperties
              }
              onClick={() =>
                onSelectedDay({ ...day, tasks: weekData.get(day.date) || [] })
              }
              aria-label={`${day.day} ${time}`}
            />
          ))}
        </div>
      ))}

      {weekDays.flatMap((day, dayIndex) => {
        const tasksForDay = weekData.get(day.date) || [];
        return tasksForDay.map((task, taskIndex) => (
          <button
            className={`calendar-event-card ${getTaskAccent(taskIndex)}`}
            key={task.id}
            style={getTaskGridStyle(dayIndex, taskIndex)}
            onClick={() => onSelectedDay({ ...day, tasks: tasksForDay })}
          >
            <p>{task.title}</p>
            <span>{task.estimated_duration || "Focused work"}</span>
          </button>
        ));
      })}
    </section>
  );
};

export default WeekGrid;
