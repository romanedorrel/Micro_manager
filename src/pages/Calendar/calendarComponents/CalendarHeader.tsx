import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

const CalendarHeader = () => {
  return (
    <header className="calendar-header">
      <div className="calendar-header-top"></div>

      <div className="calendar-toolbar">
        <div className="calendar-tabs">
          <button className="calendar-tab active">Week</button>
          <button className="calendar-tab">Month</button>
          <button className="calendar-tab">Overview</button>
        </div>

        <div className="calendar-date-controls">
          <button className="calendar-icon-btn" aria-label="Previous week">
            <ChevronLeft size={17} />
          </button>
          <button className="calendar-today-btn">Today</button>
          <button className="calendar-icon-btn" aria-label="Next week">
            <ChevronRight size={17} />
          </button>
        </div>

        <p className="calendar-range">May 18 – May 24, 2025</p>
        <div className="calendar-actions">
          <button className="new-goal-btn">
            <Plus size={16} />
            <span>New Goal</span>
          </button>
          <button className="goal-filter-btn">
            <SlidersHorizontal size={16} />
            <span>All Goals</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
