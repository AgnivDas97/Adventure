import React, { useEffect, useState } from "react";
import "../style/HomePage.css";
import { useAuth } from "../Store/auth";

const HomePage = () => {
  const [userData, setUserData] = useState({})
  const [allUploadedPost, setAllUploadedPost]=useState([])
  const [searchQuery, setSearchQuery] = useState("");


  const {user, token}= useAuth();

  useEffect(()=>{
    async function fetchAllUploadedData(){
      try {
        const response = await fetch(`http://localhost:5000/peoples/alluser`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        })
        if(response.ok){
          const result =  await response.json()
          console.log(result,"fetchAllUploadedData");
          setAllUploadedPost(result)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchAllUploadedData();
  },[])


   useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        isAdmin: user.isAdmin || false,
        createdAt: user.createdAt || "",
        profilePhoto:user.profilePhoto || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      }));
      return;
    }
  }, [user]);


   const handleStarCount = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/upload/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result,"handleStarCount");
        const updatedPost = result.upload;

        setAllUploadedPost((prev) =>
          prev.map((p) => (p._id === postId ? {...p, like:updatedPost.like} : p))
        );
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  console.log(userData,allUploadedPost,"usserData")

  return (
    
  <main className="feed-container">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by user name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="posts-list">
        {allUploadedPost.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          allUploadedPost.map((post) => {
            const hasLiked = post.like.includes(user._id);
            return (
              <div key={post._id} className="post-card">
                {/* Post Header */}
                <div className="post-header">
                  <img className="avatar" src={post.user.profilePhoto} alt="user" />
                  <div className="author">
                    {post.user.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      stroke="currentColor"
                      className="check-icon"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>

                {/* Post Text */}
                <div className="post-content text-gray-800 dark:text-gray-200 mt-2 leading-relaxed">
                {post.context}
              </div>

                {/* Post Images */}
                {post.pictures.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 rounded-lg overflow-hidden">
                    {post.pictures.map((pic, i) => (
                      <img
                        key={i}
                        src={pic}
                        alt={`uploaded-${i}`}
                        className="w-full h-40 object-cover rounded-lg transition-transform duration-200 hover:scale-105"
                      />
                    ))}
                  </div>
                )}

                {/* Post Footer */}
                <div className="post-footer">
                  <span>{post.like.length}</span> 
                  <button
                    className={`star-button ${hasLiked ? "liked" : ""}`}
                    onClick={() => handleStarCount(post._id)}
                  >
                    ★ Stars
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
    
  );
};

export default HomePage;
