const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/authenticateUser");

const {
  register,
  login,
  getProfile,
  updateProfile,
  verifyOtp,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// User Registration
router.post("/register", register);

// OTP Verification
router.post("/verify-otp", verifyOtp);

// User Login
router.post("/login", login);

// Get Profile
router.get("/profile", authenticateUser, getProfile);

// Update Profile
router.put("/profile/update",authenticateUser, updateProfile);

// Forgot Password - Send OTP
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password", resetPassword);

module.exports = router;
