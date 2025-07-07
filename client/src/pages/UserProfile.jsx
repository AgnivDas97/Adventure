import React from "react";
import "../style/UserProfile.css";

const UserProfile = () => {
  return (
    <>
      {/* <header>
        <h1>Adventure</h1>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Peoples</a>
          <a href="#">Create</a>
          <a href="#" className="active">
            Notification
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </a>
        </nav>
      </header> */}

      <section className="profile-section">
        <div className="profile-avatar"></div>
        <div className="profile-details">
          <h2>Agniv Das</h2>
          <p>
            Admin
            <span style={{ color: "#a3e635" }}>👥</span>
            <span style={{ color: "#60a5fa" }}>📦</span>
          </p>
        </div>
      </section>

      <main className="posts">
        <div className="post">
          <div className="post-header">
            <div className="post-avatar"></div>
            <strong>
              Agniv Das <span style={{ color: "#a3e635" }}>➕</span>
            </strong>
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
            <span>283</span> <span className="star">★ Star</span>
          </div>
        </div>
        <div className="post">
          <div className="post-header">
            <div className="post-avatar"></div>
            <strong>
              Agniv Das <span style={{ color: "#a3e635" }}>➕</span>
            </strong>
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
          <div className="post-footer">
            <span>293</span> <span className="star">★ Star</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
