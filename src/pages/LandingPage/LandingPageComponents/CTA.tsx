import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
const CTA = () => {
  return (
    <div className="cta">
      <img src={Logo} alt="TrueNorth Logo" />
      <h3>You don't have to figure it all out today.</h3>
      <h2>Just take the next step.</h2>
      <Link to="/signup" className="cta-button">
        Create Your Space <Leaf />
      </Link>
      Free to get started. No credit card required.
    </div>
  );
};

export default CTA;
