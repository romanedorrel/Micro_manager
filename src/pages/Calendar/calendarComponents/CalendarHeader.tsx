import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";

type CalendarHeaderProps = {
  currentWeek: Date;
  handlePrevWeek: () => void;
  handleNextWeek: () => void;
  handleToday: () => void;
};

const formatLocalDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "long", day: "numeric" });

const getWeekRange = (date: Date) => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return `${formatLocalDate(start)} - ${formatLocalDate(end)}, ${end.getFullYear()}`;
};

const CalendarHeader = ({
  currentWeek,
  handlePrevWeek,
  handleNextWeek,
  handleToday,
}: CalendarHeaderProps) => {
  // const [currentWeek, setCurrentWeek] = useState(new Date());

  // const handlePrevWeek = () => {
  //   setCurrentWeek((prev) => {
  //     const date = new Date(prev);
  //     date.setDate(date.getDate() - 7);
  //     return date;
  //   });
  // };

  // const handleNextWeek = () => {
  //   setCurrentWeek((prev) => {
  //     const date = new Date(prev);
  //     date.setDate(date.getDate() + 7);
  //     return date;
  //   });
  // };

  // const handleToday = () => {
  //   setCurrentWeek(new Date());
  // };

  return (
    <header className="calendar-header">
      <div className="calendar-heading">
        <h1>
          Calendar <Leaf size={24} />
        </h1>
      </div>

      <div className="calendar-toolbar">
        <div className="calendar-date-controls">
          <button
            onClick={() => {
              handlePrevWeek();
            }}
            className="calendar-icon-btn"
            aria-label="Previous week"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            onClick={() => {
              handleNextWeek();
            }}
            className="calendar-icon-btn"
            aria-label="Next week"
          >
            <ChevronRight size={17} />
          </button>
          <p className="calendar-range">{getWeekRange(currentWeek)}</p>
        </div>

        <div className="calendar-actions">
          <button
            onClick={() => {
              handleToday();
            }}
            className="calendar-today-btn"
          >
            Today
          </button>
          {/* <button className="calendar-view-btn">
            <span>Week</span>
            <ChevronDown size={16} />
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
