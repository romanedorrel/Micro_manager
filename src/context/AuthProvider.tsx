import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
// import { refreshSession } from "../services/authApi";
import { logOut } from "../services/authApi";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const logout = async () => {
    await logOut();
    setAccessToken(null);
  };

  // useEffect(() => {
  //   const restoreSession = async () => {
  //     try {
  //       const data = await refreshSession();
  //       setAccessToken(data.access_token);
  //     } catch {
  //       setAccessToken(null);
  //     } finally {
  //       setAuthLoading(false);
  //     }
  //   };
  //   restoreSession();
  // }, []);

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isAuthenticated,
        authLoading,
        setAuthLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
