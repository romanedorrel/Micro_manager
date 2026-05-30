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
  onSelectedDay: (day: WeekDay) => void;
};

const WeekGrid = ({ weekData, onSelectedDay }: WeekGridProps) => {
  return (
    <section className="week-grid">
      {weekData.map((day) => (
        <DayColumn key={day.date} day={day} onSelectedDay={onSelectedDay} />
      ))}
    </section>
  );
};

export default WeekGrid;
