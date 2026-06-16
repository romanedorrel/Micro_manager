import type { Task } from "../../../types/taskTypes";

type WeekDay = {
  day: string;
  date: string;
  tasks: Task[];
};

type DetailedProps = {
  selectedDay: WeekDay;
};

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
            <div className="detail-task-card" key={task.id}>
              <div>
                <p>{task.title}</p>
                {task.description && <span>{task.description}</span>}
              </div>
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
