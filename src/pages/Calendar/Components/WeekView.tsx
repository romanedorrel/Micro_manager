import WeekGrid from "./WeekGrid";

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

type WeekViewProps = {
  weekData: WeekDay[];
  setSelectedDay: (day: WeekDay) => void;
};

const WeekView = ({ weekData, setSelectedDay }: WeekViewProps) => {
  return (
    <section className="week-view">
      <div className="week-view-header">
        <div>
          <p className="week-label">Weekly Plan</p>
          <h2>May 25 - May 31</h2>
        </div>

        <button className="today-btn">Today</button>
      </div>

      <WeekGrid weekData={weekData} onSelectedDay={setSelectedDay} />
    </section>
  );
};

export default WeekView;
