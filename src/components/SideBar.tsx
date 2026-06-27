import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Calendar,
  Target,
  UserRound,
  Settings,
  LogOut,
  Menu,
  Leaf,
  House,
  Sparkles,
} from "lucide-react";
import QuotesCard from "./QuotesCard";
import sagePlant from "../assets/sage_plant.png";
import logoSmallPlain from "../assets/logo-small-transparent.png";

const SideBar = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleProfile = () => setProfileOpen(!profileOpen);

  const { logout } = useAuth();
  return (
    <div className="sidebar">
      <h2 className="sidebar-brand">
        <img src={logoSmallPlain} alt="TrueNorth logo" />
        <span>TrueNorth</span>
      </h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/today" aria-label="Today" title="Today">
              <div className="items-left">
                <House size={18} /> <span>Today</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/goals" aria-label="Goals" title="Goals">
              <div className="items-left">
                <Target size={18} /> <span>Goals</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendarpage" aria-label="Calendar" title="Calendar">
              <div className="items-left">
                <Calendar size={18} />
                <span>Calendar</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/scheduler"
              aria-label="AI Scheduler"
              title="AI Scheduler"
            >
              <div className="items-left">
                <Sparkles size={18} />
                <span>AI Scheduler</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-plant" aria-hidden="true">
        <img src={sagePlant} alt="" />
      </div>
      <QuotesCard
        icon={<Leaf size={20} />}
        quote="Small steps today create a calmer tomorrow."
      />
      <div className="profile-section">
        <button onClick={toggleProfile} aria-label="Open profile menu">
          <div className="items-left">
            <UserRound size={18} />
            <span>Profile</span>
          </div>
          <Menu size={18} />
        </button>
        {profileOpen && (
          <ul>
            <li>
              <Link to="/settings">
                <Settings size={14} /> <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/manageAccount">
                <UserRound size={14} /> <span>Manage Account</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            justifyContent: "center",
          }}
          onClick={logout}
        >
          <LogOut size={14} /> <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
