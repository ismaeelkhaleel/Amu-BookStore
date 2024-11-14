import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate for redirection

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [file, setFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in
  const navigate = useNavigate(); // useNavigate for redirection
  const location = useLocation(); // Use useLocation for accessing location state

  // Check if the user is logged in when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      navigate("/login", { state: { from: location.pathname } }); // Redirect to login if the user is not logged in
    } else {
      setIsLoggedIn(true); // User is logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a book file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("department", department);
    formData.append("faculty", faculty);
    formData.append("course", course);
    formData.append("publicationYear", publicationYear);
    formData.append("pdf", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/books/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in the headers
          },
        }
      );
      alert(res.data.msg);
      navigate("/"); // Redirect to home page after adding the book
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to add book");
    }
  };

  if (!isLoggedIn) {
    return <div>Please log in to add a book.</div>; // Render a message if the user is not logged in
  }

  return (
    <div className="addbook">
      <div className="container">
        <div className="card card-body mt-5 mb-5">
          <h2>Add Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                <b>Title:</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                <b>Author:</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                placeholder="Enter Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                <b>Department:</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="department"
                placeholder="Enter Department Name"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="faculty" className="form-label">
                <b>Faculty:</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="faculty"
                placeholder="Enter faculty Name"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="course" className="form-label">
                <b>Course:</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="course"
                placeholder="Enter Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publicationYear" className="form-label">
                <b>Publication Year:</b>
              </label>
              <input
                type="number"
                className="form-control"
                id="publicationYear"
                placeholder="Enter Publication Year"
                value={publicationYear}
                onChange={(e) => setPublicationYear(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                <b>Upload Book File:</b>
              </label>
              <input
                type="file"
                className="form-control"
                id="formFile"
                onChange={(e) => setFile(e.target.files[0])}
                required
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
          .addbook {
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

export default AddBook;
