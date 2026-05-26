import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await loginUser(formData);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userEmail", formData.email);

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      toast.error("Invalid login credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Login to continue your PracView AI journey</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="auth-switch">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;