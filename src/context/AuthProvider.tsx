import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "../lib/supabaseClient";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const logout = async () => {
    await supabase.auth.signOut();
    setAccessToken(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setAuthLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAccessToken(session?.access_token ?? null);

      setAuthLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
