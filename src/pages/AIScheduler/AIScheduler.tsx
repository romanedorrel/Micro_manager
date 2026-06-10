import AddGoalForm from "./aiSchedulerComponents/AddGoalForm";
const AddGoalPage = () => {
  return (
    <main className="add-goal-page">
      <div className="add-goal-header">
        <h1>Add Goal</h1>
        <p>Create a new goal and let AI build the plan.</p>
      </div>

      <section className="add-goal-layout">
        <AddGoalForm />
      </section>
    </main>
  );
};

export default AddGoalPage;
