import React from "react";
import { NavLink } from "react-router-dom";

const NavTab = () => {
  return (
    <nav>
      <div className="navTabContainer" style={{ display: "flex", gap: "8px" }}>
        <NavLink to="/goals/current" className="navTab">
          Current
        </NavLink>
        <NavLink to="/goals/completed" className="navTab">
          Completed
        </NavLink>
        {/* <NavLink to="/goals/archived" className="navTab">
        Archived
      </NavLink> */}
      </div>
    </nav>
  );
};

export default NavTab;
