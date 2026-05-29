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
          <button className="calendar-icon-btn">‹</button>
          <button className="calendar-today-btn">Today</button>
          <button className="calendar-icon-btn">›</button>
        </div>

        <p className="calendar-range">May 18 – May 24, 2025</p>
        <div>
          {" "}
          <button className="new-goal-btn">+ New Goal</button>
          <button className="goal-filter-btn">All Goals ˅</button>
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
