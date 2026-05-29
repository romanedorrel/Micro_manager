import CompletedCard from "../../components/CompletedCard";
import NavTab from "../../components/NavTab";

const CompletedGoals = () => {
  const goal = {
    id: 1,
    title: "Finish React Project",
    icon: "✅",
    completedDate: new Date("2024-06-15"),
  };
  return (
    <>
      <div className="outer-container">
        <CompletedCard goal={goal} />
        <CompletedCard goal={goal} />
      </div>
    </>
  );
};

export default CompletedGoals;
