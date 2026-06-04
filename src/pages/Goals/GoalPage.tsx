import { useEffect, useState } from "react";
import { getGoals } from "../../services/goalApi";
import { useAuth } from "../../context/AuthContext";
import GoalCard from "./goalsComponent/GoalCard";
import CompletedCard from "./goalsComponent/CompletedCard";
import type { Goal } from "../../types/goalTypes";
import { useNavigate } from "react-router-dom";

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activeTab, setActiveTab] = useState("current");
  const { accessToken } = useAuth();
  const completedGoals = goals.filter((goal) => goal.status === "completed");
  const currentGoals = goals.filter((goal) => goal.status === "current");

  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) return;

    const fetchGoals = async () => {
      try {
        const goals = await getGoals(accessToken);
        setGoals(goals);
        console.log("Goals:", goals);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      }
    };

    fetchGoals();
  }, [accessToken]);

  return (
    <main>
      <nav className="goal-tabs">
        <button
          className={activeTab === "current" ? "active-tab" : ""}
          onClick={() => setActiveTab("current")}
        >
          Current
        </button>
        <button
          className={activeTab === "completed" ? "active-tab" : ""}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </nav>

      <section className="goals-content">
        {activeTab === "current" && (
          <div>
            {currentGoals.map((goal) => {
              return (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onClick={() => navigate(`/goals/${goal.id}`)}
                />
              );
            })}
          </div>
        )}
        {activeTab === "completed" && (
          <div>
            {completedGoals.map((goal) => {
              return (
                <CompletedCard
                  key={goal.id}
                  goal={goal}
                  onClick={() => navigate(`/goals/${goal.id}`)}
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default GoalsPage;
