import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Feedback() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [bookId, setBookId] = useState(""); // Optional, for book-related feedback
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      navigate("/login", { state: { from: location.pathname } });
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate that email and message are not empty
    if (!email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    const feedbackData = {
      email,
      message,
      bookId: bookId || null, // If no bookId, send null
    };

    try {
      const response = await axios.post("http://localhost:5000/feedback/add", feedbackData);
      if (response.data) {
        alert("Feedback submitted successfully");
        navigate("/"); // Redirect to homepage after submitting feedback
      }
    } catch (error) {
      console.error("Error submitting feedback", error);
      alert("Error submitting feedback. Please try again.");
    }

    // Clear the form after submission
    setEmail("");
    setMessage("");
    setBookId("");
  };

  if (!isLoggedIn) {
    return <div>Please log in to give feedback.</div>;
  }

  return (
    <div className="feedback">
      <div className="container">
        <div className="card card-body mt-5 mb-5">
          <h2>Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <b>
                  <i className="fa-solid fa-envelope"></i>&nbsp;Email address:
                </b>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                <b>
                  <i className="fa-solid fa-comment"></i>&nbsp;Feedback:
                </b>
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="3"
                placeholder="Enter your feedback"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="BookId" className="form-label">
                <b>
                  <i className="fa-solid fa-book"></i>&nbsp;Book Id:
                </b>
              </label>
              <input
                className="form-control"
                id="BookId"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                placeholder="Enter book id if you are reporting a book"
              />
            </div>

            <button type="submit" className="btn btn-outline-success mb-3">
              Submit
            </button>
          </form>
        </div>
      </div>
      <style>
        {`
          .feedback {
            background-color: #bde5d2;
          }
          .container {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .container h2 {
            text-align: center;
            font-size: 2rem;
            color: orange;
            margin-bottom: 2rem;
          }
          .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
            transition: 0.3s;
          }
          .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.5);
          }
          .btn {
            width: 50%;
          }
          @media (max-width: 768px) {
            .container {
              width: 80%;
            }
          }
          .mb-3 b {
            color: green;
          }
        `}
      </style>
    </div>
  );
}

export default Feedback;
