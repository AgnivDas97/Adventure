import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";
import "../style/SignIn.css";

const URL = "http://localhost:5000/";

const SignIn = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
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
    // Handle login logic here
    console.log(user);
    try {
      const response = await fetch(`${URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', 
        body: JSON.stringify(user),
      });
      console.log(response, "login form");
      const res_data = await response.json();
      console.log(res_data, "res_data");
      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({ email: "", password: "" });
        // alert("success");
        toast.success("Login Successfully")
        navigate("/home-page");
      } else {
        // alert("error: "+res_data.message);
        toast.error("error: "+res_data.message)
      }
    } catch (error) {
      alert(error);
    }
  };

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

            {/* <!-- Right Column: Sign In Form --> */}
            <div className="form-column">
              <h2 className="form-title">
                Sign In
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
                    <label for="email">Mail Id</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-footer">
                    <button type="submit" className="btn-login">
                      <span>Log In</span>
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
                    </button>
                    <a href="/create-account" className="create-account-link">
                      Create an account
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
