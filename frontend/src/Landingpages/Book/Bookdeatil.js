import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function BookDetail() {
  const { bookId } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null); // Store book details
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch book details when the page loads
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.get(`http://localhost:5000/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the header
          }
        });
        setBook(response.data); // Set the book details
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };
  
    fetchBookDetails();
  }, [bookId]);
  

  if (loading) {
    return <div>Loading book details...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <h5>Book Details: {book.title}</h5>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">
            <strong>BookId:</strong> {book.id}
          </p>
          <p className="card-text">
            <strong>Department:</strong> {book.department || "N/A"}
          </p>
          <p className="card-text">
            <strong>Author:</strong> {book.author || "N/A"}
          </p>
          <p className="card-text">
            <strong>Course:</strong> {book.course ? book.course.join(", ") : "N/A"}
          </p>
          <p className="card-text">
            <strong>Publication Year:</strong> {book.publicationYear || "N/A"}
          </p>
          {book.pdf && (
            <a href={book.pdf} className="btn btn-primary" download>
              Download Book&nbsp;<i className="fa-solid fa-download"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
