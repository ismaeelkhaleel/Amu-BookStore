const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure the path is correct

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id); // Check if `findByPk` is used correctly

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authenticateUser;
