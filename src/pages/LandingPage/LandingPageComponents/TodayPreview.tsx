import { ArrowRight } from "lucide-react";
import TodaysPage from "../../../assets/TodaysPage.png";

const TodayPreview = () => {
  return (
    <div>
      <div>
        <h4>Focus on Today</h4>
        <h2>A clear plan for a calmer you.</h2>
        <p>
          See what matters most today, what's coming up, and stay on
          track-without feeling overwhelmed.{" "}
          <span>
            See TrueNorth in Action
            <ArrowRight />
          </span>
        </p>
      </div>
      <div>
        <img src={TodaysPage} alt="" />
      </div>
    </div>
  );
};

export default TodayPreview;
