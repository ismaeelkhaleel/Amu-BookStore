import React from "react";
import { faculties } from "../../Data/facultyData";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function Department() {
    const { facultyId } = useParams();
    const faculty = faculties.find((fac) => fac.id === parseInt(facultyId));

    if (!faculty) {
        return <p>Faculty not found</p>
    }
    const departments = faculty.departments;
    return (
        <div className="container mt-5 mb-5">
            <h2>All Departments of {faculty.name}</h2>
            <ul>
                {faculty.departments.map((department, index) => (
                    <li key={index}>
                        <Link to={`/books/${department}`}>{department}</Link>
                    </li>
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

    )
}

export default Department;