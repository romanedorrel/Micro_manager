import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthProvider } from "../context/AuthProvider";

const AuthRoute = () => {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const ProtectedRoute = () => {
  return (
    <AuthProvider>
      <AuthRoute />
    </AuthProvider>
  );
};

export default ProtectedRoute;
