import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const successMessage = location.state?.message || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/home");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">JalRakshak Login</h2>

        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-400/30 text-green-300 text-sm text-center">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-400/30 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
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
