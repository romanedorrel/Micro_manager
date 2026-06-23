import { Link } from "react-router-dom";
import logoNav from "../../../assets/logo-nav-transparent.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logoNav} alt="TrueNorth Logo" />
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
