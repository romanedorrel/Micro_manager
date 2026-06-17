import type { Task } from "../../../types/taskTypes";
import type { CSSProperties } from "react";

type WeekDay = {
  day: string;
  date: string;
  tasks: Task[];
};

type DayColumnProps = {
  day: WeekDay;
  columnIndex: number;
  onSelectedDay: (day: WeekDay) => void;
};

const DayColumn = ({ day, columnIndex, onSelectedDay }: DayColumnProps) => {
  const [, month, date] = day.date.split("-");

  return (
    <button
      className="day-column"
      style={{ "--day-column": columnIndex } as CSSProperties}
      onClick={() => onSelectedDay(day)}
    >
      <span className="day-name">{day.day.toUpperCase()}</span>
      <span className="day-date">{Number(date || month)}</span>
    </button>
  );
};

export default DayColumn;
