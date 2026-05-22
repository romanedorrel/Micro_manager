import "./App.css";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Today from "./pages/Today";
import CurrentGoals from "./pages/Goals/CurrentGoals";
import CompletedGoals from "./pages/Goals/CompletedGoals";
import { AddNew } from "./pages/Goals/AddNew";
import Overview from "./pages/Calendar/Overview";
import Detailed from "./pages/Calendar/Detailed";
import Settings from "./pages/Profile/Settings";
import AccountManagement from "./pages/Profile/AccountManagement";

function App() {
  return (
    <>
      <SideBar />
      <div className="app-content">
        <main>
          <Routes>
            <Route path="/" element={<Today />} />
            <Route path="/Goals/Current" element={<CurrentGoals />} />
            <Route path="/Goals/Completed" element={<CompletedGoals />} />
            <Route path="/Goals/AddNew" element={<AddNew />} />
            <Route path="/Calendar/Detailed" element={<Detailed />} />
            <Route path="/Calendar/Overview" element={<Overview />} />
            <Route path="/Profile/Settings" element={<Settings />} />
            <Route
              path="/Profile/ManageAccount"
              element={<AccountManagement />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
