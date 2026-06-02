import "./App.css";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Today from "./pages/Today";
import CurrentGoals from "./pages/Goals/CurrentGoals";
import CompletedGoals from "./pages/Goals/CompletedGoals";
import Settings from "./pages/Profile/Settings";
import AccountManagement from "./pages/Profile/AccountManagement";
import CalendarPage from "./pages/Calendar/CalendarPage";
import GoalPage from "./pages/Goals/GoalPage";
import AIScheduler from "./pages/AIScheduler/AIScheduler";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <>
      <SideBar />
      <div className="app-content">
        <main>
          <Routes>
            <Route path="/today" element={<Today />} />
            <Route path="/goals" element={<GoalPage />}>
              <Route index element={<CurrentGoals />} />
              <Route path="current" element={<CurrentGoals />} />
              <Route path="completed" element={<CompletedGoals />} />
            </Route>
            <Route path="/CalendarPage" element={<CalendarPage />} />
            <Route path="/scheduler" element={<AIScheduler />} />
            <Route path="/Profile/Settings" element={<Settings />} />
            <Route
              path="/Profile/ManageAccount"
              element={<AccountManagement />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
