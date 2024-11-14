const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import Sequelize User model
const { body, validationResult } = require('express-validator');

// User Registration
exports.register = async (req, res) => {
  const { name, email, password, role, department, course } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ msg: "User  already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser  = await User.create({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      role,
      department,
      course,
    });

    console.log("New user created:", newUser ); // Log the created user
    // Generate JWT token
    const token = jwt.sign({ id: newUser .id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// User Login
exports.login = [

  async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ where: { email } });
      console.log("User  found:", user ? user.id : "No user found");
    
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password.trim(), user.password);
    
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
    
      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).send("Server error");
    }
  }
];

exports.getProfile = async (req, res) => {
  try {
    // Verify JWT token and extract the user ID
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find the user by ID
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Send back user data (excluding password)
    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      course: user.course,
      books: user.books || [],
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Server error");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // Verify JWT token and extract the user ID
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find the user by ID
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Get updated user data from request body
    const { name, email, role, department, course } = req.body;

    // Update the user's details
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.department = department || user.department;
    user.course = course || user.course;

    // Save the updated user
    await user.save();

    res.json({
      msg: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        course: user.course,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Server error");
  }
};