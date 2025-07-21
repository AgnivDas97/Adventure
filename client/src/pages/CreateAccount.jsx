import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/auth";

import { toast } from "react-toastify";

import "../style/CreateAccount.css";

const CreateAccount = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profilePhoto: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log(user);
    try {
      const { name, email, phone, password } = user;
      if (!name || !email || !phone || !password) {
        alert("Please fill all the fields");
      } else {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const res_data = await response.json();
        console.log(response, "response", res_data);
        if (response.ok) {
          alert("Login Successful");
          storeTokenInLS(res_data.token);
          setUser({
            name: "",
            email: "",
            phone: "",
            password: "",
            profilePhoto: "",
          });
          navigate("/sign-in");
        } else {
          alert(res_data.extraDetails && res_data.message);
          toast(
            res_data.extraDetails ? res_data.extraDetails : res_data.message
          );
        }
      }
    } catch (error) {
      console.log("registration failed. " + error);
    }
  };

  const [loading, setLoading] = useState(false);
  const ImageSelection = (pic) => {
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dyekscdns");

      fetch("https://api.cloudinary.com/v1_1/dyekscdns/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Uploaded image:", data);
          setUser((prevUser) => ({
            ...prevUser,
            profilePhoto: data.url.toString(),
          }));
          setLoading(false);
        })
        .catch((err) => {
          console.error("Upload error:", err);
          setLoading(false);
        });
    } else {
      console.log("test5");
      setLoading(false);
      return;
    }
  };

  console.log(user, "user");
  return (
    <main className="main-container">
      <div className="card">
        <div className="card-header">Adventure</div>
        <div className="card-content">
          <div className="content-grid">
            {/* <!-- Left Column: Logo --> */}
            <div className="logo-column">
              <div className="logo-container">
                <svg
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(50,50) scale(0.9)">
                    <path
                      d="M-22.5,-42.5 L-22.5,-17.5 L-47.5,-4.5 L-47.5,-29.5 Z"
                      stroke="#111827"
                      strokeWidth="3"
                    />
                    <path
                      d="M-22.5,-17.5 L-22.5,7.5 L0,20.5 L0,-4.5 Z"
                      stroke="#111827"
                      strokeWidth="3"
                    />
                    <path
                      d="M22.5,-17.5 L22.5,-42.5 L47.5,-29.5 L47.5,-4.5 Z"
                      stroke="#111827"
                      strokeWidth="3"
                    />
                    <path
                      d="M22.5,-17.5 L22.5,7.5 L0,20.5 L0,-4.5 Z"
                      stroke="#111827"
                      strokeWidth="3"
                    />
                    <path
                      d="M-22.5,7.5 L-22.5,32.5 L0,45.5 L0,20.5 Z"
                      stroke="#111827"
                      strokeWidth="3"
                    />
                    <path
                      d="M22.5,7.5 L22.5,32.5 L0,45.5 L0,20.5 Z"
                      stroke="#111827"
                      strokeWidth="3"
                    />
                  </g>
                </svg>
              </div>
            </div>

            {/* <!-- Right Column: Sign Up Form --> */}
            <div className="form-column">
              <h2 className="form-title">
                Create account
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </h2>
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="username">Username</label>
                    <input
                      type="text"
                      id="name"
                      name="username"
                      placeholder="Enter your name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={user.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                  <label htmlFor="photo">Upload Photo</label>
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    name="photo"
                    onChange={(e) => {
                      setLoading(true);
                      if (e.target.files && e.target.files[0]) {
                        ImageSelection(e.target.files[0]);
                      }
                    }}
                  />
                </div>
                  <button type="submit" className="btn-create">
                    <span>Create</span>
                    {/* <!-- User Icon --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </button>
                </form>
              </div>
              <div className="signin-link">
                Already have an account? <a href="/sign-in">Sign In</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateAccount;
