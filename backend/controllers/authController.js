const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/User"); // Import Sequelize User model

// Helper function to validate AMU email
const isAMUEmail = (email) => /^[a-zA-Z0-9._%+-]+@myamu\.ac\.in$/.test(email);

// Helper function to validate enrollment ID
const isValidEnrollment = (enrollment) => /^[A-Za-z]{2}\d{4}$/.test(enrollment);

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service provider
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password
  },
});

// User Registration
exports.register = async (req, res) => {
  const { name, email, password, role, department, course, enrollment } = req.body;

  try {
    // Validate AMU email
    if (!isAMUEmail(email)) {
      return res.status(400).json({ msg: "Only AMU email addresses are allowed." });
    }

    // Validate enrollment format
    if (!isValidEnrollment(enrollment)) {
      return res.status(400).json({ msg: "Invalid Enrollment ID. Must be in the format 'XX1234'." });
    }

    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Create new user with pending OTP verification
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
      course,
      enrollment,
      otp,
      otpVerified: false,
    });

    // Send OTP to user's email
    await transporter.sendMail({
      to: email,
      subject: "Your OTP for AMU Book Store Registration",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.json({ msg: "Registration successful. Please verify your email with the OTP sent." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// OTP Verification
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // Mark user as verified
    user.otpVerified = true;
    user.otp = null; // Clear OTP
    await user.save();

    res.json({ msg: "OTP verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Server error");
  }
};


// Forgot Password - Send OTP
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    user.otp = otp;
    user.otpExpiration = otpExpiration; // Save OTP expiration
    await user.save();

    // Send OTP to user's email
    await transporter.sendMail({
      to: email,
      subject: "Password Reset OTP for AMU Book Store",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.json({ msg: "OTP sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // Validate password security
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordPattern.test(newPassword)) {
      return res.status(400).json({
        msg: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.",
      });
    }

    // Hash new password and update user
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null; // Clear OTP after reset
    user.otpVerified = true; // Mark OTP as verified after password reset
    await user.save();

    res.json({ msg: "Password reset successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


// Get User Profile
// In getProfile:
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;  // Use req.user instead of req.userId
    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "role", "department", "course", "enrollment"],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// In updateProfile:
exports.updateProfile = async (req, res) => {
  const { name, department, course } = req.body;

  try {
    const userId = req.user.id;  // Use req.user instead of req.userId
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update fields
    user.name = name || user.name;
    user.department = department || user.department;
    user.course = course || user.course;

    await user.save();

    res.json({ msg: "Profile updated successfully!", user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
