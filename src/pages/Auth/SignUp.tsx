import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Link } from "react-router-dom";
import "./auth.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserMessage("");
    if (password !== confirmPassword) {
      setUserMessage("Passwords do not match.");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    console.log(error);
    console.log(data);

    if (error) {
      setUserMessage(error.message);
      return;
    }

    setUserMessage("Check your email to verify your account.");
  };

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <p className="auth-label">TrueNorth</p>
        <h1>Start with the next right task.</h1>
        <p>
          A calm planning system that helps you turn goals into focused daily
          action.
        </p>
      </section>

      <section className="auth-card">
        <h2>Create your account</h2>
        <p>Start with one calm plan.</p>

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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Create Account</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login"> Log In</Link>
        </p>
        {userMessage && <p className="auth-message">{userMessage}</p>}
      </section>
    </div>
  );
};

export default SignUp;
