import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

    if (!form.fullName || !form.email || !form.phone || !form.address || !form.dob || !form.password) {
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

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Only insert profile if we got a session (email confirmation disabled)
    if (data.session) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: form.fullName,
        email: form.email,
        phone_no: form.phone,
        address: form.address,
        dob: form.dob,
      });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      navigate("/login", { state: { message: "Registration successful! Please log in." } });
    } else {
      // Email confirmation required — profile will be created after confirmation
      navigate("/login", { state: { message: "Please check your email to confirm your account, then log in." } });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join JalRakshak today</p>

        {error && <div className="register-error">{error}</div>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="register-input"
          value={form.fullName}
          onChange={handleChange}
        />

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
          Already have an account? <Link to="/login" className="register-link">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
