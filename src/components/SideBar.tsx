import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Calendar,
  Target,
  PlusCircle,
  CheckCircle,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  LayoutDashboard,
  PanelsTopLeft,
} from "lucide-react";

const SideBar = () => {
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleGoals = () => setGoalsOpen(!goalsOpen);
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
            <li>
              <button>
                <LogOut size={14} /> <span>Log Out</span>
              </button>
            </li>
          </ul>
        )}
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <div className="items-left">
                <CalendarDays size={18} /> <span>Today</span>
              </div>
            </Link>
          </li>
          <li>
            <button onClick={toggleGoals}>
              <div className="items-left">
                <Target size={18} />
                <span>Goals</span>
              </div>

              {goalsOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
            {goalsOpen && (
              <ul>
                <li>
                  <Link to="/Goal/Current">
                    <div className="items-left">
                      <Target size={14} /> <span>Current Goals</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/Goal/Completed">
                    <div className="items-left">
                      <CheckCircle size={14} /> <span>Completed Goals</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/Goal/AddNew">
                    <div className="items-left">
                      <PlusCircle size={14} /> <span>Add New Goal</span>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
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
                  <Link to="/Calendar/Detailed">
                    <div className="items-left">
                      <LayoutDashboard size={14} /> <span>Detailed View</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/Calendar/Overview">
                    <div className="items-left">
                      <PanelsTopLeft size={14} /> <span>Overview</span>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
