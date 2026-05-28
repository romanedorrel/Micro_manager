type DetailTask = {
  title: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  status: "Focus" | "Carried Over" | "Up Next";
};

const fridayTasks: DetailTask[] = [
  {
    title: "Finish static week calendar layout",
    time: "9:00 PM",
    priority: "High",
    status: "Focus",
  },
  {
    title: "Review task card spacing",
    time: "10:15 PM",
    priority: "Medium",
    status: "Carried Over",
  },
  {
    title: "Plan calendar detail interactions",
    time: "11:00 PM",
    priority: "Low",
    status: "Up Next",
  },
];

const Detailed = () => {
  return (
    <aside className="date-detail-panel">
      <div className="date-detail-header">
        <p className="detail-label">Selected Day</p>
        <h2>Friday</h2>
        <span>May 29</span>
      </div>

      <div className="detail-section">
        <h3>Today&apos;s Focus</h3>

        {fridayTasks
          .filter((task) => task.status === "Focus")
          .map((task) => (
            <div className="detail-task-card" key={task.title}>
              <div>
                <p>{task.title}</p>
                <span>{task.time}</span>
              </div>

              <strong className="detail-priority high">{task.priority}</strong>
            </div>
          ))}
      </div>

      <div className="detail-section">
        <h3>Carried Over</h3>

        {fridayTasks
          .filter((task) => task.status === "Carried Over")
          .map((task) => (
            <div className="detail-task-card" key={task.title}>
              <div>
                <p>{task.title}</p>
                <span>{task.time}</span>
              </div>

              <strong className="detail-priority medium">
                {task.priority}
              </strong>
            </div>
          ))}
      </div>

      <div className="detail-section">
        <h3>Up Next</h3>

        {fridayTasks
          .filter((task) => task.status === "Up Next")
          .map((task) => (
            <div className="detail-task-card" key={task.title}>
              <div>
                <p>{task.title}</p>
                <span>{task.time}</span>
              </div>

              <strong className="detail-priority low">{task.priority}</strong>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default Detailed;
