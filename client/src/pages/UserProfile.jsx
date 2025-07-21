import React, { useEffect, useState } from "react";
import "../style/UserProfile.css";
import { useAuth } from "../Store/auth";

const UserProfile = () => {
  const [page, setPage] = useState("posts");
  const [userData, setUserData] = useState([]);

  const { user, token } = useAuth();

  useEffect(() => {
    // You can fetch user data here if needed
    // For example, fetch user details from an API and set them in state
    // setUserData(fetchedData);

    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assuming you have a token for authentication
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("User data fetched successfully:", data);
          setUserData(data.uploads);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const [userUploadedPictures, setUserUploadedPictures] = useState([]);
  useEffect(() => {
    if (userData.length === 0) {
      return;
    }
    const fetchedPhotoList = [];
    userData.map((post) => {
      if (post.pictures && post.pictures.length > 0) {
        post.pictures.map((obj) => {
          fetchedPhotoList.push(obj);
        });
      }
    });
    setUserUploadedPictures(fetchedPhotoList);
  }, [userData]);

  // Function to handle liking a post
  const handleStarCount = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/upload/${postId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const updatedPost = await response.json();
        console.log("Post liked successfully:", updatedPost);
        // Optionally, you can update the local state to reflect the new like count
        setUserData((prevData) =>
          prevData.map((post) =>
            post._id === postId
              ? { ...post, like: updatedPost.upload.like }
              : post
          )
        );
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  console.log("User Data:", user, userData);

  return (
    <>
      <section style={{
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  padding: "1rem 0"
}}>
  <div style={{
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: "0 0 0 5px #1e293b",
    marginLeft:"20px",
  }}>
    <img
      src={user.profilePhoto}
      alt="user avatar"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }}
    />
  </div>

  <div>
    <h2 style={{ margin: 0, fontSize: "1.8rem", color: "#fff" }}>
      {user.name}
    </h2>
    <p style={{ margin: 0, fontSize: "1rem", color: "#86efac" }}>
      Admin <span style={{ color: "#a78bfa" }}>👥</span> <span>📦</span>
    </p>
  </div>
</section>

      {/* add post, photos, videos  */}
      <div className="profile-tabs flex justify-around border-b border-gray-600">
        <span
          onClick={() => setPage("posts")}
          className={`cursor-pointer px-4 py-2 font-semibold ${
            page === "posts"
              ? "text-yellow-500 border-b-2 border-yellow-500"
              : "text-gray-200"
          }`}
        >
          POST
        </span>
        <span
          onClick={() => setPage("photos")}
          className={`cursor-pointer px-4 py-2 font-semibold ${
            page === "photos"
              ? "text-yellow-500 border-b-2 border-yellow-500"
              : "text-gray-200"
          }`}
        >
          PHOTOS
        </span>
        <span
          onClick={() => setPage("videos")}
          className={`cursor-pointer px-4 py-2 font-semibold ${
            page === "videos"
              ? "text-yellow-500 border-b-2 border-yellow-500"
              : "text-gray-200"
          }`}
        >
          VIDEOS
        </span>
      </div>

      {page === "posts" && (
        <UserPosts userData={userData} handleStarCount={handleStarCount} />
      )}
      {page === "photos" && (
        <UserPhotos userUploadedPictures={userUploadedPictures} />
      )}
      {page === "videos" && <UserVideos />}
    </>
  );
};

export default UserProfile;

const UserPosts = ({ userData, handleStarCount }) => {
  const { user } = useAuth();
  return (
    <main className="posts">
      {userData.map((post, index) => {
        const hasLiked = post.like.includes(user._id);
        return (
          <div className="post" key={index}>
            <div className="post-header">
              <div className="post-avatar"></div>
              <strong>
                {post.user.name} <span style={{ color: "#a3e635" }}>➕</span>
              </strong>
            </div>
            <div className="post-content">{post.context}</div>
            {post.pictures && post.pictures.length > 0 && (
              <div className="post-image-grid grid grid-cols-2 md:grid-cols-3 gap-3 my-3">
                {post.pictures.map((picture, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden shadow hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src={picture}
                      alt={`Post ${i}`}
                      className="w-full h-32 object-cover bg-gray-800"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="post-footer">
              <span>{post.like.length ? post.like.length : 0}</span>{" "}
              <span
                className={`star-button ${hasLiked ? "liked" : ""}`}
                onClick={() => handleStarCount(post._id)}
              >
                ★ Star
              </span>
            </div>
          </div>
        );
      })}
    </main>
  );
};

const UserPhotos = ({ userUploadedPictures }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const openModal = (idx) => {
    setCurrentIdx(idx);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) =>
      prev === 0 ? userUploadedPictures.length - 1 : prev - 1
    );
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) =>
      prev === userUploadedPictures.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main className="photos py-6">
      {userUploadedPictures.length === 0 ? (
        <div className="no-photos text-center text-gray-400 py-8">
          <p>No photos uploaded yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
            {userUploadedPictures.map((picture, index) => (
              <div
                key={index}
                className="overflow-hidden shadow-lg bg-gray-900 border border-gray-700 hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img
                  src={picture}
                  alt={`User uploaded ${index}`}
                  className="w-full h-48 object-cover hover:opacity-90 transition duration-200"
                />
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {isOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
              onClick={closeModal}
            >
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl px-3 py-1 rounded hover:bg-gray-700"
                onClick={prevImage}
              >
                &#8592;
              </button>
              <img
                src={userUploadedPictures[currentIdx]}
                alt={`Big view ${currentIdx}`}
                className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl px-3 py-1 rounded hover:bg-gray-700"
                onClick={nextImage}
              >
                &#8594;
              </button>
              <button
                className="absolute top-6 right-6 text-white text-2xl"
                onClick={closeModal}
              >
                &#10005;
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

const UserVideos = () => {
  return (
    <main className="videos">
      <div className="video">
        <div className="video-header">
          <div className="video-avatar"></div>
          <strong>Agniv Das</strong>
        </div>
        <div className="video-content">
          <video controls>
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="video">
        <div className="video-header">
          <div className="video-avatar"></div>
          <strong>Agniv Das</strong>
        </div>
        <div className="video-content">
          <video controls>
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
};

// const data = [
//     {
//         "_id": "687554e2236ce1ef48e90e9a",
//         "user": {
//             "_id": "686a6312a2b6e2cfd0c86468",
//             "name": "roniagniv",
//             "email": "roniagniv@gmail.com"
//         },
//         "context": "hiii",
//         "pictures": [],
//         "like": 0,
//         "createdAt": "2025-07-14T19:05:06.125Z",
//         "updatedAt": "2025-07-14T19:05:06.125Z",
//         "__v": 0
//     },
//     {
//         "_id": "687555423d9bf0c9c97ab342",
//         "user": {
//             "_id": "686a6312a2b6e2cfd0c86468",
//             "name": "roniagniv",
//             "email": "roniagniv@gmail.com"
//         },
//         "context": "hi",
//         "pictures": [],
//         "like": 0,
//         "createdAt": "2025-07-14T19:06:42.471Z",
//         "updatedAt": "2025-07-14T19:06:42.471Z",
//         "__v": 0
//     },
//     {
//         "_id": "6875559d3d9bf0c9c97ab34f",
//         "user": {
//             "_id": "686a6312a2b6e2cfd0c86468",
//             "name": "roniagniv",
//             "email": "roniagniv@gmail.com"
//         },
//         "context": "hi, I  am AGNIV",
//         "pictures": [],
//         "like": 0,
//         "createdAt": "2025-07-14T19:08:13.989Z",
//         "updatedAt": "2025-07-14T19:08:13.989Z",
//         "__v": 0
//     }
// ]
