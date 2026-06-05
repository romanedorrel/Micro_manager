import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { refreshSession, logOut } from "../services/authApi";
import { useLocation } from "react-router-dom";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const location = useLocation();

  const logout = async () => {
    await logOut();
    setAccessToken(null);
  };
  const publicRoutes = ["/login", "/signup"];

  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    if (isPublicRoute) return;

    const restoreSession = async () => {
      setAuthLoading(true);
      try {
        const data = await refreshSession();
        setAccessToken(data.access_token);
      } catch {
        setAccessToken(null);
      } finally {
        setAuthLoading(false);
      }
    };
    restoreSession();
  }, [isPublicRoute]);

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isAuthenticated,
        authLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
