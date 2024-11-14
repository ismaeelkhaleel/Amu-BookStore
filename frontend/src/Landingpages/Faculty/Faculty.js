import React from "react";
import { Link } from "react-router-dom";
import { faculties } from "../../Data/facultyData";
function Faculty() {
  return (
    <div className="container mt-5 mb-5">
      <h2>All Faculties</h2>
       <ul>
         {faculties.map((faculty) => (
           <li key={faculty.id}><Link to={`/departments/${faculty.id}`}>{faculty.name}</Link></li>
         ))}
       </ul>
       <style>
        {`
        ul li a {
        text-decoration: none;
        color: #000;
        font-size: 20px;
        }
        ul li a:hover {
        color: red;
        transition: 0.2s;
        }
        `}
       </style>
    </div>
  );
}

export default Faculty;
