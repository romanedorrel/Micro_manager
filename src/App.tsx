import "./App.css";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Today from "./pages/Today/Today";
import Settings from "./pages/Profile/Settings";
import AccountManagement from "./pages/Profile/AccountManagement";
import CalendarPage from "./pages/Calendar/CalendarPage";
import GoalPage from "./pages/Goals/GoalPage";
import AIScheduler from "./pages/AIScheduler/AIScheduler";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import GoalIdPage from "./pages/Goals/GoalIdPage";
import LandingPage from "./pages/LandingPage/LandingPage";
// import AuthCallback from "./pages/Auth/AuthCallback";

function App() {
  return (
    <>
      <SideBar />
      <div className="app-content">
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/auth/callback" element={<AuthCallback />} /> */}
            <Route element={<ProtectedRoute />}>
              <Route path="/today" element={<Today />} />
              <Route path="/calendarpage" element={<CalendarPage />} />
              <Route path="/scheduler" element={<AIScheduler />} />
              <Route path="/goals" element={<GoalPage />} />
              <Route path="/goals/:goalId" element={<GoalIdPage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="manageAccount" element={<AccountManagement />} />
            </Route>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
