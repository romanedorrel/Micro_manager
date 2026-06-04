import { useState } from "react";
import { logIn } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken } = useAuth();

  const handleLogIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await logIn({ email, password });
      setAccessToken(data.access_token);
      console.log("Successful LogIn", data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <div className="auth-page">
      <section className="auth-hero">
        <p className="auth-label">AI Scheduler</p>
        <h1>Start with the next right task.</h1>
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
          Dont have an account? <Link to="/signup">Create one</Link>
        </p>
      </section>
    </div>
  );
};
export default Login;
