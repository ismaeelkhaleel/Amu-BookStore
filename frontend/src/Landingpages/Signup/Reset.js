import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import libraryImage from "../../assets/images/library.jpg";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const email = localStorage.getItem("email");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMessage(response.data.msg); // Display success or error message
      if (response.data.msg === "Password reset successful!") {
        localStorage.removeItem("email");
        navigate("/login");
      }
    } catch (error) {
      setMessage(error.response.data.msg || "Error occurred");
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
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            readOnly
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-success reset-btn">Reset Password</button>
        </form>
        {message && <p>{message}</p>}
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
          .reset-btn {
          width: 100%;
          margin-top: 20px;
          margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default ResetPassword;
