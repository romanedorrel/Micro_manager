import { useState } from "react";
import { signUp } from "../../services/authApi";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserMessage("");
    try {
      const data = await signUp({ email, password });
      console.log("Account created:", data);
      setUserMessage("Account created");

      navigate("/login");
    } catch {
      setUserMessage("Sign up Failed");
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
        <h2>Create your Account</h2>
        <p>Start building your daily system.</p>

        <form className="auth-form" onSubmit={handleSignUp}>
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
          <button type="submit">Create Account</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login"> Log In</Link>
        </p>
      </section>
      {userMessage && <p className="auth-message">{userMessage}</p>}
    </div>
  );
};

export default SignUp;
