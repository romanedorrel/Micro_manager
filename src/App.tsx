import "./App.css";
import SideBar from "./components/SideBar";
import { Navigate, Routes, Route } from "react-router-dom";
import Today from "./pages/Today";
// import CurrentGoals from "./pages/Goals/CurrentGoals";
// import CompletedGoals from "./pages/Goals/CompletedGoals";
import Settings from "./pages/Profile/Settings";
import AccountManagement from "./pages/Profile/AccountManagement";
import CalendarPage from "./pages/Calendar/CalendarPage";
import GoalPage from "./pages/Goals/GoalPage";
import AIScheduler from "./pages/AIScheduler/AIScheduler";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import GoalIdPage from "./pages/Goals/GoalIdPage";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <>
      <SideBar />
      <div className="app-content">
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/today" replace />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <AuthProvider>
                  <ProtectedRoute />
                </AuthProvider>
              }
            >
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
