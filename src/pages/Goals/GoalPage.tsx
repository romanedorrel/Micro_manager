import { useEffect, useState } from "react";
import { getGoals, updateGoal } from "../../services/goalApi";
import { useAuth } from "../../context/AuthContext";
import GoalCard from "./goalsComponent/GoalCard";
import CompletedCard from "./goalsComponent/CompletedCard";
import type { Goal } from "../../types/goalTypes";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  Flame,
  Leaf,
  Plus,
  Target,
} from "lucide-react";
import balanceStones from "../../assets/balance-stones.png";
import "./goals.css";

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activeTab, setActiveTab] = useState("current");
  const { accessToken } = useAuth();
  const completedGoals = goals.filter((goal) => goal.status === "completed");
  const currentGoals = goals.filter((goal) => goal.status === "current");
  const today = new Date();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()));

  const goalsDueThisWeek = currentGoals.filter((goal) => {
    if (!goal.deadline) return false;
    const dueDate = new Date(`${goal.deadline}T00:00:00`);
    return dueDate >= today && dueDate <= endOfWeek;
  });

  const overdueGoals = currentGoals.filter((goal) => {
    if (!goal.deadline) return false;
    return new Date(`${goal.deadline}T23:59:59`) < today;
  });

  const navigate = useNavigate();

  const handleCheck = async (goal: Goal) => {
    if (!accessToken) return;
    const newStatus = goal.status === "completed" ? "current" : "completed";

    try {
      const updatedGoal = await updateGoal(
        goal.id,
        { status: newStatus },
        accessToken,
      );
      setGoals((currentGoals) =>
        currentGoals.map((g) => (g.id === goal.id ? updatedGoal : g)),
      );
    } catch (error) {
      console.error("Failed to update goal status:", error);
    }
  };

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

  const formatCompletedDate = (dateString?: string) => {
    if (!dateString) return "Recently";

    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const recentCompletedGoals = completedGoals.slice(0, 3);

  return (
    <main className="goals-page">
      <section className="goals-workspace">
        <div className="goals-primary">
          <header className="goals-page-header">
            <div>
              <h1>Goals</h1>
              <p>Track and manage all of your goals in one place.</p>
            </div>
            <button
              type="button"
              className="new-goal-btn"
              onClick={() => navigate("/scheduler")}
            >
              <Plus size={20} />
              <span>New Goal</span>
            </button>
          </header>
          <div>
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
                <div className="goal-card-list">
                  {currentGoals.map((goal) => {
                    return (
                      <GoalCard
                        key={goal.id}
                        goal={goal}
                        onClick={() => navigate(`/goals/${goal.id}`)}
                        checked={goal.status === "completed"}
                        onCheck={() => {
                          handleCheck(goal);
                        }}
                      />
                    );
                  })}
                </div>
              )}
              {activeTab === "completed" && (
                <div className="goal-card-list">
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
          </div>
          <aside className="goals-footer-note">
            <Leaf size={32} />
            <p>Stay focused. Small steps every day lead to big results.</p>
          </aside>
        </div>

        <aside className="goals-insights">
          <section className="goals-image-card">
            <img src={balanceStones} alt="" />
            <div>
              <Leaf size={34} />
              <div>
                <h2>Good morning, Justin</h2>
                <p>Let's make today meaningful.</p>
              </div>
            </div>
          </section>

          <section className="goals-side-card">
            <h2>Goals Overview</h2>
            <dl className="goals-overview-list">
              <div>
                <dt>
                  <Target size={17} />
                  Active Goals
                </dt>
                <dd>{currentGoals.length}</dd>
              </div>
              <div>
                <dt>
                  <Check size={17} />
                  Completed Goals
                </dt>
                <dd>{completedGoals.length}</dd>
              </div>
              <div>
                <dt>
                  <CalendarClock size={17} />
                  Due This Week
                </dt>
                <dd>{goalsDueThisWeek.length}</dd>
              </div>
              <div>
                <dt>
                  <Flame size={17} />
                  Overdue
                </dt>
                <dd>{overdueGoals.length}</dd>
              </div>
            </dl>
          </section>

          <section className="goals-side-card">
            <h2>Recently Completed</h2>
            <div className="recent-goals-list">
              {recentCompletedGoals.length > 0 ? (
                recentCompletedGoals.map((goal) => (
                  <div key={goal.id}>
                    <CheckCircle2 size={17} />
                    <span>{goal.title}</span>
                    <time>{formatCompletedDate(goal.updated_at)}</time>
                  </div>
                ))
              ) : (
                <p>No completed goals yet.</p>
              )}
            </div>
            <button type="button" onClick={() => setActiveTab("completed")}>
              View all completed goals
              <ArrowRight size={18} />
            </button>
          </section>

          <section className="goals-quote-card">
            <Leaf size={72} />
            <p>
              Progress doesn't happen all at once. It happens one choice at a
              time.
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
};

export default GoalsPage;
