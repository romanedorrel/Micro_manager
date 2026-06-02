import { useState } from "react";
import { logIn } from "../../services/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await logIn({ email, password });
      localStorage.setItem("token", data.session.access_token);
      console.log("Successful LogIn", data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <form className="Auth-Forms" onSubmit={handleLogIn}>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
};
export default Login;
