import { NavLink } from "react-router-dom";

type NavTabProps = {
  to: string;
  children: React.ReactNode;
};

const NavTab = ({ to, children }: NavTabProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "navTab active" : "navTab")}
    >
      {children}
    </NavLink>
  );
};

export default NavTab;
