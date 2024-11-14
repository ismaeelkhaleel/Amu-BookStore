const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize
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

// Define the Book model
const Book = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      // Ensure the department name is always stored in lowercase
      this.setDataValue('department', value.toLowerCase());
    },
  },
  faculty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course: {
    type: DataTypes.JSON, // Use JSON to store course data
    allowNull: false,
  },
  pdf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicationYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  addedBy: {
    type: DataTypes.INTEGER, // Assuming the user ID is an integer
    allowNull: false,
  },
});

// Synchronize the model with the database
sequelize.sync()
  .then(() => console.log("Book model synchronized with the database."))
  .catch((err) => console.error("Error syncing the Book model:", err));

module.exports = { Book };
