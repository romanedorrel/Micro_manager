import type { Task } from "../../../types/taskTypes";
import {
  CalendarCheck,
  CircleDot,
  Clock3,
  Goal,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import sagePlant from "../../../assets/sage_plant.png";

type WeekDay = {
  day: string;
  date: string;
  tasks: Task[];
};

type DetailedProps = {
  selectedDay: WeekDay | null;
};

const Detailed = ({ selectedDay }: DetailedProps) => {
  const featuredTask = selectedDay?.tasks[0];

  return (
    <aside className="detail-panel">
      <div className="detail-header">
        <div>
          <p className="detail-label">Selected Event</p>
          <h2>{featuredTask?.title || "Plan the week"}</h2>
          <span>{selectedDay?.date || "Choose a day to review details"}</span>
        </div>
        <div className="detail-actions">
          <button aria-label="Edit event">
            <Pencil size={15} />
          </button>
          <button aria-label="Delete event">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="detail-section">
        <h3>Details</h3>

        {selectedDay && selectedDay.tasks.length > 0 ? (
          selectedDay.tasks.map((task) => (
            <div className="detail-task-card" key={task.id}>
              <CalendarCheck size={16} />
              <div>
                <p>{task.title}</p>
                <span>{task.description || "Scheduled focused work."}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-detail-illustration">
            <img src={sagePlant} alt="" />
            <p>Select a calendar block to see the tasks planned for that day.</p>
          </div>
        )}
      </div>

      <div className="detail-section">
        <h3>Meta</h3>
        <div className="detail-meta-row">
          <Clock3 size={16} />
          <span>{featuredTask?.estimated_duration || "Focus block"}</span>
        </div>
        <div className="detail-meta-row">
          <MapPin size={16} />
          <span>TrueNorth workspace</span>
        </div>
        <div className="detail-meta-row">
          <Goal size={16} />
          <span>Project A - Major progress</span>
        </div>
        <div className="detail-meta-row">
          <CircleDot size={16} />
          <span>{featuredTask?.status || "Scheduled"}</span>
        </div>
      </div>
    </aside>
  );
};

export default Detailed;
