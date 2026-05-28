import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  CalendarDays,
  Calendar,
  Target,
  User,
  Settings,
  LogOut,
  Menu,
  Quote,
} from "lucide-react";
import QuotesCard from "./QuotesCard";

const SideBar = () => {
  // const [goalsOpen, setGoalsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // const toggleGoals = () => setGoalsOpen(!goalsOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  return (
    <div className="sidebar">
      <div className="profile-section">
        <button onClick={toggleProfile}>
          <div className="items-left">
            <User size={18} />
            <span>Profile</span>
          </div>
          <Menu size={18} />
        </button>
        {profileOpen && (
          <ul>
            <li>
              <Link to="/Profile/Settings">
                <Settings size={14} /> <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/Profile/ManageAccount">
                <User size={14} /> <span>Manage Account</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <div className="items-left">
                <CalendarDays size={18} /> <span>Today</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/goals/current">
              <div className="items-left">
                <Target size={18} /> <span>Goals</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/CalendarPage">
              <div className="items-left">
                <Calendar size={18} />
                <span>Calendar</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
      <QuotesCard
        icon={<Quote size={20} />}
        quote="Stay consistent. Small daily actions lead to massive progress."
      />
      <div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <LogOut size={14} /> <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
