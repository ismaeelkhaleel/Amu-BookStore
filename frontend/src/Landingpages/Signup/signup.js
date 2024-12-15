import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import libraryImage from "../../assets/images/library.jpg";

// Helper function for AMU Email validation
const isAMUEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@myamu\.ac\.in$/.test(email);
};

// Helper function for Enrollment ID validation (two letters followed by 4 digits, e.g., GM2685)
const isValidEnrollment = (enrollment) => {
  return /^[A-Za-z]{2}\d{4}$/.test(enrollment); // Regex for 2 letters + 4 digits
};

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role, change as needed
    department: "",
    course: "",
    enrollment: "", // Enrollment ID
  });

  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(""); // To store OTP input
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { email: formData.email, otp });
      setMessage("OTP verified successfully!");
      setOtpSent(false);
      navigate("/login");
    } catch (error) {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAMUEmail(formData.email)) {
      setMessage("Please enter a valid AMU email address.");
      return;
    }

    if (!isValidEnrollment(formData.enrollment)) {
      setMessage("Invalid Enrollment ID. Please enter a valid ID (e.g., GM2685).");
      return;
    }

    try {
      // Check password security (use regex pattern for password validation)
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordPattern.test(formData.password)) {
        setMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
        return;
      }

      // Send the signup data to the backend
      const response = await axios.post("http://localhost:5000/register", formData);

      // After registration, send OTP to the user email
      setOtpSent(true);
      setMessage("A one-time password (OTP) has been sent to your email for verification.");
    } catch (error) {
      setMessage(error.response?.data?.msg || "Error during signup");
    }
  };

  return (
    <div
      className="signup"
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
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: "8px",
          padding: "30px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ color: "#000", textAlign: "center", marginBottom: "30px" }}>Sign Up</h2>

        {/* OTP verification form */}
        {otpSent ? (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-outline-primary">Verify OTP</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
            />
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleChange}
            />
            <input
              type="text"
              name="enrollment"
              placeholder="Enrollment ID (e.g., GM2685)"
              value={formData.enrollment}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-outline-primary signup-btn"><b style={{ color: "#fff" }}>Sign Up</b></button>
          </form>
        )}
        {message && <div>{message}</div>}
        <b>
          Already have an account? &nbsp;&nbsp;<a href="/login" style={{ textDecoration: "none" }}>Login</a>
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
        .signup-btn {
          width: 100%;
          margin-top: 20px;
          margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  );
}

export default Signup;



