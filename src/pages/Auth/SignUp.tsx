import { useState } from "react";
import { signUp } from "../../services/authApi";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await signUp({ email, password });
      console.log("Account created:", data);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <>
      <form className="Auth-Forms" onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
    </>
  );
};

export default SignUp;
