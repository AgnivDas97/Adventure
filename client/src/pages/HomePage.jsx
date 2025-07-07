import React, { useEffect, useState } from "react";
import "../style/HomePage.css";
import { useAuth } from "../Store/auth";

const HomePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    createdAt: "",
})

  const {user}= useAuth();

   useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        isAdmin: user.isAdmin || false,
        createdAt: user.createdAt || "",
      }));
      return;
    }
  }, [user]);

  console.log(userData,"usserData")

  return (
    <div>
      <main className="feed-container">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>

        <div className="post-card">
          <div className="post-header">
            <div className="avatar"></div>
            <div className="author">
              {userData.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>
          <div className="post-content">
            Witness the IMMORTAL story of Rama vs. Ravana
            <br />
            Ramayana.
            <br />
            Our Truth. Our History.
            <br />
            Filmed for IMAX.
            <br />
            From INDIA for a BETTER World.
          </div>
          <div className="post-image"></div>
          <div className="post-footer">
            <span>203</span> Star
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
