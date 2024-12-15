import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import libraryImage from "../../assets/images/library.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/forgot-password", { email });
      setMessage(response.data.msg);

      if (response.data.msg === "OTP sent to your email.") {
        localStorage.setItem("email", email);
        navigate("/reset-password");  // Navigate to the reset-password page after OTP is sent
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || "Error occurred");
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
        <h2 style={{ marginBottom: "20px" }}>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-danger forgot-btn">Send OTP</button>
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
          .forgot-btn {
          width: 100%;
           
          margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default ForgotPassword;

