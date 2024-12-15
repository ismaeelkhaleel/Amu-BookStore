import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Landingpages/Home/Homepage.js";
import "./index.css";
import Feedback from "./Landingpages/Feedback/feedback.js";
import Signup from "./Landingpages/Signup/signup.js";
import Login from "./Landingpages/Signup/login.js";
import Addbook from "./Landingpages/Book/Addbook.js";
import Faculty from "./Landingpages/Faculty/Faculty.js";
import Department from "./Landingpages/Faculty/Department.js";
import DeptBook from "./Landingpages/Book/DeptBook.js";
import Terms from "./Landingpages/Security/Terms.js";
import Privacy from "./Landingpages/Security/Privacy.js";
import Books from "./Landingpages/Book/Books.js";
import Profile from "./Landingpages/User/Profile.js";
import BookDetail from "./Landingpages/Book/Bookdeatil.js";
import ForgotPassword from "./Landingpages/Signup/Forgot.js";
import ResetPassword from "./Landingpages/Signup/Reset.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={<Homepage />}
      />
      <Route
        path="/feedback"
        element={
          <Feedback />
        }
      />
      <Route
        path="/signup"
        element={
          <Signup />
        }
      />
      <Route
        path="/login"
        element={
          <Login />
        }
      />
      <Route
        path="/addbook"
        element={
          <Addbook />
        }
      />
      <Route
        path="/faculties"
        element={
          <Faculty />
        }
      />
      <Route
        path="/departments/:facultyId"
        element={
          <Department />
        }
      />
      <Route
        path="/books/:departmentName"
        element={
          <DeptBook />
        }
      />
      <Route
        path="/security/terms&conditions"
        element={
          <Terms />
        }
      />
      <Route
        path="/security/privacypolicy"
        element={
          <Privacy />
        }
      />
      <Route
        path="/books"
        element={
          <Books />
        }
      />
      <Route
        path="/books/:bookId"
        element={
          <BookDetail />
        }
      />
      <Route
        path="/profile"
        element={
          <Profile />
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ForgotPassword />
        } />
        <Route
        path="/reset-password"
        element={
          <ResetPassword />
        } />
    </Routes>
    <Footer />
  </BrowserRouter>
);
