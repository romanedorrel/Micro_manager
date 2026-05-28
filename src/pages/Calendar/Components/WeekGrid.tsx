import DayColumn from "./DayColumn";

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

type WeekGridProps = {
  weekData: WeekDay[];
};

const WeekGrid = ({ weekData }: WeekGridProps) => {
  return (
    <section className="week-grid">
      {weekData.map((day) => (
        <DayColumn key={day.date} day={day} />
      ))}
    </section>
  );
};

export default WeekGrid;
