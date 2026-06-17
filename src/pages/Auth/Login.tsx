import { useState } from "react";
import { logIn } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const handleLogIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserMessage("");
    try {
      const data = await logIn({ email, password });
      setAccessToken(data.access_token);
      setUserMessage("Welcome back.");

      navigate("/today");
    } catch {
      setUserMessage("We couldn't find that email and password.");
    }
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
