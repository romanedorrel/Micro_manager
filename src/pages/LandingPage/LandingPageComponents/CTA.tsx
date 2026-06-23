import { Leaf, Mountain } from "lucide-react";
import React from "react";

const CTA = () => {
  return (
    <div className="cta">
      <Mountain />
      <h3>You don't have to figure it all out today.</h3>
      <h2>Just take the next step.</h2>
      <button className="cta-button">
        Create Your Space <Leaf />
      </button>
      Free to get started. No credit card required.
    </div>
  );
};

export default CTA;
