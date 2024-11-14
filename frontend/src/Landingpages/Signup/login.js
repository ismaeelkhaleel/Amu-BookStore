import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // Import necessary hooks
import libraryImage from "../../assets/images/library.jpg";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const location = useLocation(); // Get the location object
  const navigate = useNavigate(); // Hook to navigate after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data:", formData); // Log form data for debugging
      const response = await axios.post("http://localhost:5000/login", formData);
      console.log("Login response:", response); // Log response to check the token
      alert("Login successful!");
      localStorage.setItem("token", response.data.token); // Store JWT token

      // Check if there is a location.state (previous page), if not, default to "/"
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo); // Redirect to the previous page or home
    } catch (error) {
      console.error("Error:", error); // Log error for debugging
      alert(error.response?.data?.msg || "Error during login");
    }
  };

  return (
    <div
      className="login"
      style={{
        backgroundImage: `url(${libraryImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          padding: "30px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ color: "#000", textAlign: "center", marginBottom: "30px" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <a href="/forgot-password" style={{ textDecoration: "none", fontWeight: "500" }}>Forgot Password?</a>
          <button type="submit" className="btn btn-outline-primary login-btn">
            <b style={{ color: "#fff" }}>Log In</b>
          </button>
        </form>
        <b>
          Don't have an account? &nbsp;&nbsp;<a href="/signup" style={{ textDecoration: "none" }}>Sign Up</a>
        </b>
      </div>
      <style>
        {`
        input{
        margin-bottom: 20px;
        width: 100%;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #ccc;
        }
        .card {
        text-align: center;
        }
        .login-btn {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
        }
        `}
      </style>
    </div>
  );
}

export default Login;
