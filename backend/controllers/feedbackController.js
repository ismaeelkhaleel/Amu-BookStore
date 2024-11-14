const Feedback = require("../models/Feedback"); // Sequelize Feedback model
const Book = require("../models/Book"); // Sequelize Book model (for associations)

// Add new feedback
exports.addFeedback = async (req, res) => {
  const { email, message, bookId } = req.body;

  try {
    const newFeedback = await Feedback.create({ email, message, bookId });
    res.json(newFeedback); // Send back the created feedback
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Get all feedback with associated book details
exports.getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: {
        model: Book, // Include the associated Book details
        as: "book",
      },
    });
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
