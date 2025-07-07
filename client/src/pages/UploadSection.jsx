import React from "react";
import "../style/UploadSection.css";

const UploadSection = () => {
  return (
    <div>
      <main className="create-container">
        <form className="post-form">
          <div className="post-top">
            <div className="avatar"></div>
            <textarea rows="4" placeholder="Share something..."></textarea>
          </div>
          <div className="media-options">
            <div className="media-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 7l-9 6-9-6"
                />
              </svg>
            </div>
            <div className="media-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <button type="submit" className="upload-btn">
            Upload
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4-4m0 0l-4 4m4-4v12"
              />
            </svg>
          </button>
        </form>
      </main>
    </div>
  );
};

export default UploadSection;
