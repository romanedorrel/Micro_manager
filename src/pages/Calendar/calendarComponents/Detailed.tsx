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

type DetailedProps = {
  selectedDay: WeekDay;
};

// const fridayTasks: Task[] = [
//   {
//     title: "Finish static week calendar layout",
//     time: "9:00 PM",
//     priority: "High",
//     status: "Focus",
//   },
//   {
//     title: "Review task card spacing",
//     time: "10:15 PM",
//     priority: "Medium",
//     status: "Carried Over",
//   },
//   {
//     title: "Plan calendar detail interactions",
//     time: "11:00 PM",
//     priority: "Low",
//     status: "Up Next",
//   },
// ];

const Detailed = ({ selectedDay }: DetailedProps) => {
  return (
    <aside className="detail-panel">
      <div className="detail-header">
        <p className="detail-label">Selected Day</p>
        <h2>{selectedDay.day}</h2>
        <span>{selectedDay.date}</span>
      </div>

      <div className="detail-section">
        <h3>Today's Focus</h3>

        {selectedDay.tasks.length > 0 ? (
          selectedDay.tasks.map((task) => (
            <div className="detail-task-card" key={task.title}>
              <div>
                <p>{task.title}</p>
                <span>{task.time}</span>
              </div>

              <strong
                className={`detail-priority ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </strong>
            </div>
          ))
        ) : (
          <p className="empty-detail-text">No tasks planned for this day.</p>
        )}
      </div>
    </aside>
  );
};

export default Detailed;
