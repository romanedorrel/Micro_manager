import WeekGrid from "./WeekGrid";
import type { Task } from "../../../types/taskTypes";

type WeekDay = {
  day: string;
  date: string;
  tasks: Task[];
};

type WeekViewProps = {
  weekData: Map<string, Task[]>;
  setSelectedDay: (day: WeekDay) => void;
};

const WeekView = ({ weekData, setSelectedDay }: WeekViewProps) => {
  return (
    <section className="week-view">
      <WeekGrid weekData={weekData} onSelectedDay={setSelectedDay} />
    </section>
  );
};

export default WeekView;
