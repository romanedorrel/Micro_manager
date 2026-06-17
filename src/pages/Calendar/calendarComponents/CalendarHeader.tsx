import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sprout,
} from "lucide-react";

const formatLocalDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "long", day: "numeric" });

const getWeekRange = () => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return `${formatLocalDate(start)} - ${formatLocalDate(end)}, ${end.getFullYear()}`;
};

const CalendarHeader = () => {
  return (
    <header className="calendar-header">
      <div className="calendar-heading">
        <h1>
          Calendar <Sprout size={24} />
        </h1>
      </div>

      <div className="calendar-toolbar">
        <div className="calendar-date-controls">
          <button className="calendar-icon-btn" aria-label="Previous week">
            <ChevronLeft size={17} />
          </button>
          <button className="calendar-icon-btn" aria-label="Next week">
            <ChevronRight size={17} />
          </button>
          <p className="calendar-range">{getWeekRange()}</p>
        </div>

        <div className="calendar-actions">
          <button className="calendar-today-btn">Today</button>
          <button className="calendar-view-btn">
            <span>Week</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
