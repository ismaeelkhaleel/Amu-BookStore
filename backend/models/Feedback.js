const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

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


// Define the Feedback model
const Feedback = sequelize.define("Feedback", {
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Equivalent to `required: true` in Mongoose
  },
  message: {
    type: DataTypes.TEXT, // Use TEXT for potentially longer messages
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER, // Foreign key referencing the Book model
    allowNull: true, // Optional field
  },
});

sequelize.sync()
  .then(() => console.log("feedback model synchronized with the database."))
  .catch((err) => console.error("Error syncing the User model:", err));
// Export the model
module.exports = Feedback;
