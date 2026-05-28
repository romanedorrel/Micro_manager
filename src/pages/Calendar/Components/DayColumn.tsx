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
};

const DayColumn = ({ day }: DayColumnProps) => {
  return (
    <div className="day-column">
      <div className="day-column-header">
        <span className="day-name">{day.day}</span>

        <span className="day-date">{day.date}</span>
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
