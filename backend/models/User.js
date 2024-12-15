const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Create a connection to the database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

// Define the User model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  enrollment: {  // New field
    type: DataTypes.STRING,  // You can adjust the type based on the format of the enrollment number
    allowNull: true,  // Set to false if the enrollment number is required
  },
  otp: {
    type: DataTypes.STRING,  // Store OTP
    allowNull: true,
  },
  otpExpiration: {
    type: DataTypes.BIGINT, // Store OTP expiration time (milliseconds)
    allowNull: true,
  },
});

sequelize.sync({ alter: true })
  .then(() => console.log("User model synchronized with the database."))
  .catch((err) => console.error("Error syncing the User model:", err));
// Export the model
module.exports = User;
