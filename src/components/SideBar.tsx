import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  CalendarDays,
  Calendar,
  Target,
  // PlusCircle,
  // CheckCircle,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  LayoutDashboard,
  PanelsTopLeft,
  Quote,
} from "lucide-react";
import QuotesCard from "./QuotesCard";

const SideBar = () => {
  // const [goalsOpen, setGoalsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // const toggleGoals = () => setGoalsOpen(!goalsOpen);
  const toggleCalendar = () => setCalendarOpen(!calendarOpen);
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
            <button onClick={toggleCalendar}>
              <div className="items-left">
                <Calendar size={18} />
                <span>Calendar</span>
              </div>

              {calendarOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
            {calendarOpen && (
              <ul>
                <li>
                  <NavLink to="/Calendar/Detailed">
                    <div className="items-left">
                      <LayoutDashboard size={14} /> <span>Detailed View</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Calendar/Overview">
                    <div className="items-left">
                      <PanelsTopLeft size={14} /> <span>Overview</span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            )}
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
