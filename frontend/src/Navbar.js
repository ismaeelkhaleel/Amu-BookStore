import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query
  const [searchResults, setSearchResults] = useState([]); // Store the search results
  const [suggestions, setSuggestions] = useState([]); // Store search suggestions
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle search input change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSuggestions([]); // Clear suggestions when query is empty
      return;
    }

    try {
      // Fetch books matching the search query (for suggestions)
      const response = await axios.get(`http://localhost:5000/books/search?query=${query}`);
      setSuggestions(response.data); // Set the suggestions based on user input
    } catch (err) {
      console.error("Error fetching search suggestions:", err);
    }
  };

  // Handle suggestion click (navigate to book detail)
  const handleSuggestionClick = async (suggestion) => {
    setSearchQuery(suggestion); // Set the clicked suggestion as the query
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.get(`http://localhost:5000/books/search?query=${suggestion}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the header
        }
      });
      setSearchResults(response.data); // Fetch results based on the suggestion
      setSuggestions([]); // Clear suggestions after selection
  
      // Redirect to the book detail page based on the selected suggestion
      if (response.data.length > 0) {
        const bookId = response.data[0]._id; // Assuming you want to show the first book's details
        navigate(`/books/${bookId}`); // Navigate to the book detail page
      }
    } catch (err) {
      console.error("Error fetching books based on suggestion:", err);
    }
  };
  
  

  // Handle form submission (search)
  const handleSearchSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.get(`http://localhost:5000/books/search?query=${searchQuery}`);
      setSearchResults(response.data); // Set search results
      setSuggestions([]); // Clear suggestions after search submission
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          BookHub
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex mx-auto search-bar" role="search" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange} // Handle input change
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            {searchQuery && suggestions.length > 0 && (
              <ul className="search-suggestions">
                {suggestions.map((book, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(book.id)} // Handle suggestion click (passing book ID)
                  >
                    {book.title} by {book.author}
                  </li>
                ))}
              </ul>
            )}
          </form>

          <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/addbook">
                Add Books
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/books">
                Books
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/faculties">
                Faculty
              </a>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleLogout}>
                    Log Out
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">
                    <i className="fa-solid fa-user"></i>
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  Sign Up
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`
        .navbar-brand {
          font-size: 2rem;
          font-weight: 700;
          margin-left: 1rem;
          color: orange;
        }
        .nav-link {
          margin-left: 2rem;
          font-weight: 600;
          font-size: 1.2rem;
          color: white;
          cursor: pointer;
        }
        .nav-link:hover {
          color: green;
          transition: 0.5s;
          transform: scale(1.2);
        }
        .navbar {
          background-color: #800000;
          position: sticky;
          top: 0;
        }
        .search-suggestions {
          list-style-type: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: white;
          border: 1px solid #ccc;
          max-height: 200px;
          overflow-y: auto;
          margin: 0;
          padding: 0;
          z-index: 1000;
        }
        .search-suggestions li {
          padding: 10px;
          cursor: pointer;
        }
        .search-suggestions li:hover {
          background-color: #f1f1f1;
        }
        .search-results {
          margin-top: 20px;
        }
        .book-item {
          cursor: pointer;
          padding: 10px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
        }
        .book-item:hover {
          background-color: #f1f1f1;
        }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
