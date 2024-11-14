import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Axios for API calls

function Books() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [books, setBooks] = useState([]); // State to store books
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      navigate("/login", { state: { from: location.pathname } });
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate, location]);

  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("token"); // Fetch token from localStorage
      try {
        const response = await axios.get("http://localhost:5000/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data); // Log the response to check the data
        setBooks(response.data); // Store books in state
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false); // Stop loading on error
      }
    };

    if (isLoggedIn) {
      fetchBooks();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Please log in to access the books page.</div>;
  }

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <h5>Books available for all Departments</h5>
      <div className="row mt-4">
        {books.map((book) => (
          <div key={book.id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#5a26b5" ,textAlign: "center"}}>{book.title}</h5>
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
                {isLoggedIn ? (
                  <a href={book.pdf} className="btn btn-primary" download>
                    Download Book&nbsp;<i className="fa-solid fa-download"></i>
                  </a>
                ) : (
                  <button className="btn btn-danger" disabled>
                    Please log in to download
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
