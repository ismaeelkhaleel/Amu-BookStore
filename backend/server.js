const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors only once

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// CORS options
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Use an environment variable for frontend URL (for deployment)
  methods: "GET,POST,PUT,DELETE", // Allowed methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

app.use(cors(corsOptions)); // Use CORS middleware with options

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Connect to the database
require("./config/db"); // Import db.js to initialize the connection

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/books", require("./routes/bookRoutes"));
app.use("/feedback", require("./routes/feedbackRoutes"));

// Global Error Handler (Optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
