const express = require("express");
const multer = require("multer");
const { addBook , getAllBooks, getBooksByDepartment, searchBooks, getBook} = require("../controllers/bookController");
const authenticateUser = require("../middlewares/authenticateUser");
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/books/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } }); // File size limit: 50MB

// Route to add a book (protected route)
router.post("/add", authenticateUser, upload.single("pdf"), addBook);
// Route to get all books
router.get("/", authenticateUser, getAllBooks);
router.get("/department/:departmentName", getBooksByDepartment);
router.get("/search", searchBooks); // GET request for searching books
router.get("/:bookId", authenticateUser, getBook);
module.exports = router;
