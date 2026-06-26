import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./auth.css";
import { supabase } from "../../lib/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailVerified = searchParams.get("verified") === "true";
  const handleLogIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setUserMessage(error.message);
      return;
    }

    navigate("/today");
  };
  return (
    <div className="auth-page">
      <section className="auth-hero">
        <p className="auth-label">TrueNorth</p>
        <h1>Start with the right task.</h1>
        <p>
          A calm planning system that helps you turn goals into focused daily
          action.
        </p>
      </section>

      <section className="auth-card">
        <h2>Welcome back</h2>
        <p>Log in to continue your plan.</p>
        {emailVerified && (
          <p className="success-message">
            Email verified successfully. You can now log in.
          </p>
        )}
        <form className="auth-form" onSubmit={handleLogIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
        {userMessage && <p className="auth-message">{userMessage}</p>}
      </section>
    </div>
  );
};
export default Login;
