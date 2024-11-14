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
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin", "superadmin"),
      defaultValue: "user",
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    tableName: "Users", // Explicitly set the table name to "Users"
    freezeTableName: true, // Optional: Prevent Sequelize from pluralizing the table name
  }
);

sequelize.sync()
  .then(() => console.log("User model synchronized with the database."))
  .catch((err) => console.error("Error syncing the User model:", err));

// Export the model
module.exports = User;
