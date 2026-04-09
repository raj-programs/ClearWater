import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  return (
    <div className="login-container">

      <form className="login-form">
        <h2 className="login-title">JalRakshak Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button" onClick={(e) => { e.preventDefault(); navigate("/home"); }}>
          Login
        </button>

        <p className="text-center mt-5 text-sm text-white/55">Don't have an account?</p>
        <Link
          to="/register"
          className="block w-full mt-2 py-3 rounded-lg border border-sky-400/50 bg-transparent text-sky-400 font-semibold text-sm text-center no-underline hover:bg-sky-400/15 hover:shadow-[0_0_14px_rgba(56,189,248,0.4)] transition-all duration-300"
        >
          Register Here
        </Link>
      </form>

    </div>
  );
}

export default Login;