const AddGoalForm = () => {
  return (
    <form className="add-goal-form">
      <section className="form-card">
        <h2>Goal Details</h2>

        <label>
          Goal Name
          <input type="text" placeholder="Become a Junior Software Engineer" />
        </label>

        <label>
          Goal Description
          <textarea placeholder="Describe what you want to accomplish..." />
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
            <input type="date" />
          </label>
        </div>

        <div className="form-group">
          <p>Priority</p>

          <div className="option-row">
            <button type="button" className="option-btn">
              Low
            </button>
            <button type="button" className="option-btn">
              Medium
            </button>
            <button type="button" className="option-btn active">
              High
            </button>
          </div>
        </div>

        <div className="form-group">
          <p>Estimated Effort</p>

          <div className="option-row">
            <button type="button" className="option-btn">
              Small
            </button>
            <button type="button" className="option-btn">
              Medium
            </button>
            <button type="button" className="option-btn active">
              Large
            </button>
          </div>
        </div>

        <div className="form-group">
          <p>Available Days</p>

          <div className="option-row wrap">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <button type="button" className="option-btn" key={day}>
                {day}
              </button>
            ))}
          </div>
        </div>

        <label>
          Additional Notes
          <textarea placeholder="Anything else the AI should know?" />
        </label>

        <div className="form-actions">
          <button type="button" className="secondary-btn">
            Cancel
          </button>
          <button type="submit" className="primary-btn">
            Generate Plan
          </button>
        </div>
      </section>
    </form>
  );
};

export default AddGoalForm;
