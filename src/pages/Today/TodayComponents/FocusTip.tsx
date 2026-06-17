import { useMemo } from "react";

const focusTips = [
  "Small steps still move you forward.",
  "Progress matters more than perfection.",
  "Start where you are. Momentum will follow.",
  "Future you will be grateful you began today.",
  "You don't have to finish everything—just the next step.",
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
      <h3>Focus Tip</h3>
      <p>{tip}</p>
    </div>
  );
};

export default FocusTip;
