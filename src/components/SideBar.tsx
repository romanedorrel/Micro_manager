import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Calendar,
  Target,
  User,
  Settings,
  LogOut,
  Menu,
  Quote,
  House,
  Sparkle,
} from "lucide-react";
import QuotesCard from "./QuotesCard";

const SideBar = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleProfile = () => setProfileOpen(!profileOpen);

  const { logout } = useAuth();
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
              <Link to="/settings">
                <Settings size={14} /> <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/manageAccount">
                <User size={14} /> <span>Manage Account</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
      <h2>TrueNorth</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/today">
              <div className="items-left">
                <House size={18} /> <span>Today</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/goals">
              <div className="items-left">
                <Target size={18} /> <span>Goals</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendarpage">
              <div className="items-left">
                <Calendar size={18} />
                <span>Calendar</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scheduler">
              <div className="items-left">
                <Sparkle size={18} />
                <span>AI Scheduler</span>
              </div>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/">
              <div className="items-left">
                <House size={18} /> <span>DashBoard</span>
              </div>
            </NavLink>
          </li> */}
        </ul>
      </nav>
      <QuotesCard
        icon={<Quote size={20} />}
        quote="Small steps today create a calmer tomorrow."
      />
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
