import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { createGoal } from "../../../services/goalApi";
import type { GoalInput } from "../../../types/goalTypes";
import { generateTasks } from "../../../services/aiApi";
import { createTask } from "../../../services/tasksApi";

type GeneratedTask = {
  title: string;
  description: string;
  status: "pending";
  goal_id?: string;
};

const AddGoalForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<GoalInput["priority"]>("high");
  const [effort, setEffort] = useState<GoalInput["effort"]>("high");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const toggleDay = (day: string) => {
    setAvailableDays((days) =>
      days.includes(day)
        ? days.filter((currentDay) => currentDay !== day)
        : [...days, day],
    );
  };

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Evenly distribute generated tasks between today and the goal deadline
  // while preserving their original order.
  const scheduleTasks = (tasks: GeneratedTask[], deadline: string) => {
    const today = new Date();
    const endDate = new Date(deadline);

    const totalDays =
      Math.floor((endDate.getTime() - today.getTime()) / (3600000 * 24)) + 1;

    return tasks.map((task, index) => {
      const dayOffset = Math.floor((index * totalDays) / tasks.length);

      const scheduledDate = new Date(today);
      scheduledDate.setDate(today.getDate() + dayOffset);

      return {
        ...task,
        scheduled_date: formatLocalDate(scheduledDate),
      };
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken || !title.trim() || !deadline) return;

    setError("");
    setIsSaving(true);

    try {
      const goal = await createGoal(
        {
          title,
          description,
          deadline,
          priority,
          effort,
          available_days: availableDays,
          notes,
          status: "current",
        },
        accessToken,
      );
      const generatePlan = await generateTasks(goal);
      const scheduledTasks = scheduleTasks(generatePlan.tasks, deadline);

      await Promise.all(
        scheduledTasks.map((task: GeneratedTask & { scheduled_date: string }) =>
          createTask(
            {
              goal_id: goal.id,
              title: task.title,
              description: task.description,
              status: "pending",
              scheduled_date: task.scheduled_date,
            },
            accessToken,
          ),
        ),
      );
      navigate(`/goals/${goal.id}`);
    } catch (error) {
      console.error("Failed to create goal", error);
      setError("Could not generate tasks plan. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="add-goal-form" onSubmit={handleSubmit}>
      <section className="form-card">
        <h2>Goal Details</h2>

        <label>
          Goal Name
          <input
            type="text"
            placeholder="Become a Junior Software Engineer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Goal Description
          <textarea
            placeholder="Describe what you want to accomplish..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="form-row">
          <label>
            Category
            <select>
              <option>Career</option>
              <option>Fitness</option>
              <option>School</option>
              <option>Finance</option>
              <option>Personal</option>
            </select>
          </label>

          <label>
            Target Deadline
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <p>Priority</p>

          <div className="option-row">
            <button
              type="button"
              className={`option-btn ${priority === "low" ? "active" : ""}`}
              onClick={() => setPriority("low")}
            >
              Low
            </button>
            <button
              type="button"
              className={`option-btn ${priority === "medium" ? "active" : ""}`}
              onClick={() => setPriority("medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={`option-btn ${priority === "high" ? "active" : ""}`}
              onClick={() => setPriority("high")}
            >
              High
            </button>
          </div>
        </div>

        <div className="form-group">
          <p>Estimated Effort</p>

          <div className="option-row">
            <button
              type="button"
              className={`option-btn ${effort === "low" ? "active" : ""}`}
              onClick={() => setEffort("low")}
            >
              Small
            </button>
            <button
              type="button"
              className={`option-btn ${effort === "medium" ? "active" : ""}`}
              onClick={() => setEffort("medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={`option-btn ${effort === "high" ? "active" : ""}`}
              onClick={() => setEffort("high")}
            >
              Large
            </button>
          </div>
        </div>

        <div className="form-group">
          <p>Available Days</p>

          <div className="option-row wrap">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <button
                type="button"
                className={`option-btn ${
                  availableDays.includes(day) ? "active" : ""
                }`}
                key={day}
                onClick={() => toggleDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <label>
          Additional Notes
          <textarea
            placeholder="Anything else the AI should know?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        {error && <p>{error}</p>}

        <div className="form-actions">
          <button
            type="submit"
            className="primary-btn"
            disabled={isSaving || !title.trim() || !deadline}
          >
            {isSaving ? "Generating..." : "Generate Suggestions"}
          </button>
        </div>
      </section>
    </form>
  );
};

export default AddGoalForm;
