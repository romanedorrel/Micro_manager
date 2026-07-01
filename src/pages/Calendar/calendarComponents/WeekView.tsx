import WeekGrid from "./WeekGrid";
import type { Task } from "../../../types/taskTypes";

type WeekDay = {
  day: string;
  date: string;
  tasks: Task[];
};

type WeekViewProps = {
  currentWeek: Date;
  weekData: Map<string, Task[]>;
  setSelectedDay: (day: WeekDay) => void;
};

const WeekView = ({ currentWeek, weekData, setSelectedDay }: WeekViewProps) => {
  return (
    <section className="week-view">
      <WeekGrid
        currentWeek={currentWeek}
        weekData={weekData}
        onSelectedDay={setSelectedDay}
      />
    </section>
  );
};

export default WeekView;
