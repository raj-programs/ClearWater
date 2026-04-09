import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.userId || !form.fullName || !form.email || !form.phone || !form.address || !form.dob || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: form.userId,
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          dob: form.dob,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      // Success — go to login
      navigate("/");
    } catch (err) {
      setError("Server unavailable. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join JalRakshak today</p>

        {error && <div className="register-error">{error}</div>}

        <div className="register-row">
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            className="register-input"
            value={form.userId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="register-input"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="register-input"
          value={form.email}
          onChange={handleChange}
        />

        <div className="register-row">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="register-input"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            className="register-input"
            value={form.dob}
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Full Address"
          className="register-input"
          value={form.address}
          onChange={handleChange}
        />

        <div className="register-row">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="register-input"
            value={form.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="register-input"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="register-footer">
          Already have an account? <Link to="/" className="register-link">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
