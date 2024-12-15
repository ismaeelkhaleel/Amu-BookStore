const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Replace with the correct path

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(400).json({ msg: "Invalid token structure, no user ID found" });
    }

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ msg: "Token is not valid or expired" });
  }
};

// Export the middleware
module.exports = authenticateUser;
