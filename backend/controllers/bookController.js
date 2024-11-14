const { Book } = require("../models/Book"); // Ensure the path to your model is correct
const { Sequelize} = require("sequelize");

exports.addBook = async (req, res) => {
  const { title, author, department, faculty, course, publicationYear } = req.body;
  const userId = req.user.id; // Assuming the user ID is set by authentication middleware
  const pdfPath = req.file ? req.file.path : null;

  try {
    // Validate required fields
    if (!title || !author || !department || !faculty || !course || !publicationYear || !pdfPath) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    let parsedCourse;
    try {
      parsedCourse = JSON.parse(course);
    } catch (err) {
      parsedCourse = course; // If not valid JSON, use it as-is
    }

    // Add the book to the database
    const newBook = await Book.create({
      title,
      author,
      department,
      faculty,
      course: parsedCourse, // Parse course if sent as a JSON string
      pdf: pdfPath,
      publicationYear,
      addedBy: userId,
    });

    res.status(201).json({ msg: "Book added successfully", newBook });
  } catch (error) {
    console.error("Error in addBook:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
// Fetch all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll(); // Fetch all books from the database
    const formattedBooks = books.map(book => {
      // Ensure course is an array, and use book.get() to extract plain data
      const bookData = book.get(); // Get the plain data from the Sequelize instance
      const course = Array.isArray(bookData.course) ? bookData.course : [bookData.course];
      return { ...bookData, course }; // Return the book with the corrected course field
    });
    res.status(200).json(formattedBooks); // Send books as a response
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ msg: "Failed to fetch books" });
  }
};


// controllers/bookController.js


const { Op } = require("sequelize"); // Sequelize operators

exports.getBooksByDepartment = async (req, res) => {
  try {
    // URL se department name fetch karke lowercase mein convert karein
    const departmentName = req.params.departmentName.toLowerCase();

    // Database mein case-insensitive match ke liye query
    const books = await Book.findAll({
      where: {
        department: {
          [Op.eq]: departmentName, // Case-insensitive match ensure karein
        },
      },
    });

    // Agar books nahi mili
    if (books.length === 0) {
      return res.status(404).json({ msg: `No books found for department: ${departmentName}` });
    }

    // Books return karein
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books by department:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Search for books by title, author, department, or course
exports.searchBooks = async (req, res) => {
  const { query } = req.query; // Get the search query from the request

  try {
    // Perform the search in the database, searching for books based on multiple fields
    const books = await Book.findAll({
      where: {
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.like]: `%${query}%` } },
          { author: { [Sequelize.Op.like]: `%${query}%` } },
          { department: { [Sequelize.Op.like]: `%${query}%` } },
          { course: { [Sequelize.Op.like]: `%${query}%` } },
        ],
      },
    });

    res.json(books); // Return the list of matched books
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).send("Server error");
  }
};

// In your backend (Node.js/Express)
exports.getBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId); // Assuming you're using MongoDB with Mongoose
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.json(book); // Return the book details
  } catch (err) {
    res.status(500).send("Error fetching book details");
  }
};
