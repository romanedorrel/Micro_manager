import TaskCard from "./TaskCard";

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

type DayColumnProps = {
  day: WeekDay;
  onSelectedDay: (day: WeekDay) => void;
};

const DayColumn = ({ day, onSelectedDay }: DayColumnProps) => {
  return (
    <div className="day-column">
      <div className="day-column-header">
        <button className="day-select-btn" onClick={() => onSelectedDay(day)}>
          {" "}
          <span className="day-name">{day.day}</span>
          <span className="day-date">{day.date}</span>
        </button>{" "}
      </div>

      <div className="day-column-tasks">
        {day.tasks.length > 0 ? (
          day.tasks.map((task, index) => <TaskCard key={index} task={task} />)
        ) : (
          <div className="empty-day">
            <span>No Tasks</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayColumn;
