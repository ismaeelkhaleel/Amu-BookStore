import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        department: "",
        course: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Retrieve the JWT token from localStorage or cookies
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("No token found. Please log in.");
                    setLoading(false);
                    return;
                }

                // Make API call to fetch profile
                const response = await axios.get("http://localhost:5000/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Set user profile data in state
                setCurrentUser(response.data);
                setFormData(response.data); // Prepopulate the form with current profile data
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load user profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setFormData(currentUser); // Revert to original data
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Retrieve the JWT token from localStorage or cookies
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found. Please log in.");
                return;
            }

            // Send PUT request to update profile
            const response = await axios.put("http://localhost:5000/profile/update", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the profile state with the response data
            setCurrentUser(response.data.user); // Correct the response path
            setError(null);
            setEditMode(false); // Exit edit mode after successful update
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("Failed to update profile.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="profile">
            <div className="container">
                <div className="card card-body mt-5 mb-5">
                    <h1>Profile</h1>
                    {editMode ? (
                        <form className="edit_profile" onSubmit={handleSubmit}>
                            <div>
                                <label for="name"><b>Name:</b></label><br></br>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label for="department"><b>Department:</b></label><br></br>
                                <input
                                    type="text"
                                    name="department"
                                    id="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label for="course"><b>Course:</b></label><br></br>
                                <input
                                    type="text"
                                    name="course"
                                    id="course"
                                    value={formData.course}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button className="btn btn-outline-success" type="submit">Save Changes</button>
                            <button className="btn btn-outline-danger" type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <div>
                            <p><strong>Name:</strong> {currentUser.name}</p>
                            <p><strong>Enrollment:</strong> {currentUser.enrollment}</p>
                            <p><strong>Email:</strong> {currentUser.email}</p>
                            <p><strong>Course:</strong> {currentUser.course || "N/A"}</p>
                            <p><strong>Department:</strong> {currentUser.department || "N/A"}</p>
                            <button className="btn btn-outline-success" onClick={handleEdit}>Edit Profile</button>
                        </div>
                    )}
                </div>
            </div>
            <style>
                {`
        .profile{
        background-color: #bde5d2;
        }
         .container {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
            @media (max-width: 768px) {
            .container {
              width: 80%;
            }
          }
            input {
            margin-bottom:1rem;
            width:100%;
            }
            button {
            width:40%;
            margin-bottom:1rem;
            }
            .edit_profile{
            display:flex;
            flex-direction:column;
            }
            label b {
            color: green;
            }
            .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
            transition: 0.3s;
          }
          .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.5);
          }
        `}
            </style>
        </div>
    );
}

export default Profile;
