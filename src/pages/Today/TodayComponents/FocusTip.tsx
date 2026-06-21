import { useMemo } from "react";
import { Sparkle } from "lucide-react";
const focusTips = [
  "Small progress still counts. Start with the next clear step.",
  "Progress matters more than perfection.",
  "Start where you are. Momentum will follow.",
  "Future you will be grateful you began today.",
  "You don't have to finish everything, just the next step.",
  "Consistency beats intensity.",
  "Done is better than waiting for perfect.",
];

const FocusTip = () => {
  const tip = useMemo(() => {
    const day = new Date().getDay();
    return focusTips[day % focusTips.length];
  }, []);

  return (
    <div className="focus-tip">
      <div className="focus-tip-header">
        <Sparkle size={22} />
        <h3>Focus Tip</h3>
      </div>
      <p>{tip}</p>
    </div>
  );
};

export default FocusTip;
