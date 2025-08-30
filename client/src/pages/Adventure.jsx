import React from "react";
import "../style/Adventure.css";
import Image from "../../public/Adventure-logo1.png";

const Adventure = () => {
  return (
    <main className="main-container">
      <div className="card">
        <div className="card-content">
          <div className="content-grid">
            {/* <!-- Left Column: Text content and buttons --> */}
            <div className="text-column">
              <h1>Adventure</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quasquam, voluptatibus. Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Aperiam ipsa nam rerum delectus, optio quidem
                mollitia autem quia eveniet quod facere libero vero ducimus
                neque nulla earum magni placeat fuga. something i add
              </p>
              <div className="button-group">
                <a href="/sign-in" className="btn-primary">
                  <span>Sign In</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
                </a>
                <a href="/create-account" className="btn-secondary">
                  Create an account
                </a>
              </div>
            </div>

            {/* <!-- Right Column: Logo --> */}
            <div className="logo-column">
              <div className="logo-container">
                <img src={Image} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Footer with social links --> */}
        <div className="card-footer">
          <div className="social-links">
            <a href="#" className="social-link">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a href="#" className="social-link">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.23-2.06.088.621 1.924 2.422 3.318 4.564 3.356-1.756 1.376-3.963 2.195-6.323 2.195-.41 0-.814-.024-1.21-.07 2.278 1.456 4.977 2.308 7.898 2.308 9.477 0 14.656-7.854 14.656-14.657 0-.224-.005-.447-.014-.668.998-.722 1.864-1.622 2.55-2.65z" />
              </svg>
              <span>Twitter</span>
            </a>
            <a href="#" className="social-link">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a href="#" className="social-link">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-4.47 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Adventure;
