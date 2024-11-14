// In your React component (DeptBooks.js)

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DeptBooks() {
  const { departmentName } = useParams(); // Get department name from URL
  const [booksList, setBooksList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Check if token exists
    if (!token) {
      setIsLoggedIn(false);
      return; // Stop further execution if no token is found
    }

    // If token exists, consider user logged in
    setIsLoggedIn(true);

    const fetchBooks = async () => {
      try {
        const encodedDepartmentName = encodeURIComponent(departmentName.toLowerCase());
        const response = await axios.get(`http://localhost:5000/books/department/${encodedDepartmentName}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBooksList(response.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setIsLoggedIn(false); // Token invalid, force logout
          localStorage.removeItem("token");
        }
      }
    };

    fetchBooks();
  }, [departmentName]);


  return (
    <div className="container mt-5 mb-5">
      {isLoggedIn ? (
        <div>
          <h5>Books available for the Department of {departmentName}</h5>
          <div className="row mt-4">
            {booksList.length > 0 ? (
              booksList.map((book) => (
                <div key={book.id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text"><strong>Author:</strong> {book.author}</p>
                      <p className="card-text">
                        <strong>Course:</strong>{" "}
                        {Array.isArray(book.course) ? book.course.join(", ") : book.course || "N/A"}
                      </p>

                      <p className="card-text"><strong>Publication Year:</strong> {book.publicationYear}</p>
                      <a href={book.pdf} className="btn btn-primary" download>
                        Download Book&nbsp;<i className="fa-solid fa-download"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No books found for the Department of {departmentName}</p>
            )}
          </div>
        </div>
      ) : (
        <div>Please log in to access the department's books.</div>
      )}
    </div>
  );
}

export default DeptBooks;
