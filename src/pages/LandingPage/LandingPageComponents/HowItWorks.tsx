import { Sprout, Sunrise, TreePalm } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="how-it-works-content">
        <div className="how-it-works-card">
          <Sprout />
          <h4>Dream</h4>
          <p>Set up a goal that matters to you.</p>
        </div>
        <div className="how-it-works-card">
          <TreePalm />
          <h4>Breath</h4>
          <p>TrueNorth helps break it down into manageable steps.</p>
        </div>
        <div className="how-it-works-card">
          <Sunrise />
          <h4>Begin</h4>
          <p>Focus only on what matters today.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
