import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion

import Homepage from "./Landingpages/Home/Homepage.js";
import "./index.css";
import Feedback from "./Landingpages/Feedback/feedback.js";
import Signup from "./Landingpages/Signup/signup.js";
import Login from "./Landingpages/Signup/login.js";
import Addbook from "./Landingpages/Book/Addbook.js";
import Faculty from "./Landingpages/Faculty/Faculty.js";
import Department from "./Landingpages/Faculty/Department.js";
import DeptBook  from "./Landingpages/Book/DeptBook.js";
import Terms from "./Landingpages/Security/Terms.js";
import Privacy from "./Landingpages/Security/Privacy.js";
import Books from "./Landingpages/Book/Books.js";
import Profile from "./Landingpages/User/Profile.js";
import BookDetail from "./Landingpages/Book/Bookdeatil.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Homepage />
          </motion.div>
        }
      />
      <Route
        path="/feedback"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Feedback />
          </motion.div>
        }
      />
      <Route
        path="/signup"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Signup />
          </motion.div>
        }
      />
      <Route
        path="/login"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Login />
          </motion.div>
        }
      />
      <Route
        path="/addbook"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Addbook />
          </motion.div>
        }
      />
      <Route
        path="/faculties"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Faculty />
          </motion.div>
        }
      />
      <Route
        path="/departments/:facultyId"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Department />
          </motion.div>
        }
      />
      <Route
        path="/books/:departmentName"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DeptBook />
          </motion.div>
        }
      />
      <Route
        path="/security/terms&conditions"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Terms />
          </motion.div>
        }
      />
      <Route
        path="/security/privacypolicy"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Privacy />
          </motion.div>
        }
      />
      <Route
        path="/books"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Books />
          </motion.div>
        }
      />
      <Route
        path="/books/:bookId"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookDetail />
          </motion.div>
        }
      />
      <Route
        path="/profile"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Profile />
          </motion.div>
        }
      />
    </Routes>
    <Footer />
  </BrowserRouter>
);
