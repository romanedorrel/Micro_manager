import { GoalCard } from "../../components/GoalCard";
import { Presentation } from "lucide-react";
import NavTab from "../../components/NavTab";

const CurrentGoals = () => {
  const sampleGoal = {
    id: "1",
    title: "Launch New Marketing Campaign",
    description:
      "Create and launch a new marketing campaign for our latest product.",
    dueDate: new Date("2024-07-31"),
    progress: 45,
    completedTasks: 9,
    totalTasks: 20,
    status: "At Risk",
    estimatedHours: 15,
    icon: <Presentation size={25} />,
    onClick: () => {
      console.log("Goal card clicked!");
      // You can navigate to a detailed view or perform other actions here
    },
  };
  return (
    <>
      <h2>Current Goals</h2>
      <div className="outer-container">
        <GoalCard goal={sampleGoal} />
        <GoalCard goal={sampleGoal} />
      </div>
    </>
  );
};

export default CurrentGoals;
