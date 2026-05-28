import { Outlet } from "react-router-dom";
import NavTab from "../../components/NavTab";

const GoalsPage = () => {
  return (
    <main>
      <nav className="goal-tabs">
        <NavTab to="current">Current</NavTab>
        <NavTab to="completed">Completed</NavTab>
      </nav>

      <section className="goals-content">
        <Outlet />
      </section>
    </main>
  );
};

export default GoalsPage;
