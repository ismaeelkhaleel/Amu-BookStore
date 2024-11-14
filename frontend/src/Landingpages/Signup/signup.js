import React, { useState } from "react";
import axios from "axios";
import libraryImage from "../../assets/images/library.jpg";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role, change as needed
    department: "",
    course: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.msg || "Error during signup");
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
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          padding: "30px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ color: "#000", textAlign: "center", marginBottom: "30px" }}>Sign Up</h2>
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
          /><br></br>
          <button type="submit" className="btn btn-outline-primary signup-btn"><b style={{ color: "#fff" }}>Sign Up</b></button>
        </form>
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
