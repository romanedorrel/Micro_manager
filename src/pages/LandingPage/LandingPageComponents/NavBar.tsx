import { Mountain } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Mountain size={32} />
        <h2>TrueNorth</h2>
      </div>
      <ul>
        <li className="navbar-secondary">
          <Link to="/login">Log In</Link>
        </li>
        <li className="navbar-primary">
          <Link to="/signup">Create Your Space</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
