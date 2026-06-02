import { Outlet } from "react-router-dom";
import NavTab from "../../components/NavTab";
import { useEffect } from "react";
import { getGoals } from "../../services/goalApi";

const GoalsPage = () => {
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goals = await getGoals();
        console.log("Goals:", goals);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      }
    };

    fetchGoals();
  }, []);

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
