import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleAuthCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        navigate("/login");
        console.log("No code found");
        return;
      }
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      console.log("callback data:", data);
      console.log("callback error:", error);

      if (error) {
        console.error("Auth callback error:", error.message);
      }
      navigate("/today");
      console.log("Navigating to /today");
    };
    handleAuthCallback();
  }, [navigate]);

  return <p>Signing you in</p>;
};

export default AuthCallback;
