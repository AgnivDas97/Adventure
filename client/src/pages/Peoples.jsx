import React, { useEffect, useState } from "react";
import { useAuth } from "../Store/auth";

const Peoples = () => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null); // null means show list in mobile
  const [tab, setTab] = useState("posts");
  const [mockPeoples, setMockPeoples] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    // fetch all uqnic user from server
    try {
      async function fetchAllUserList() {
        const response = await fetch("http://localhost:5000/peoples", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assuming you have a token for authentication
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const UpdatedData = data.map((obj) => {
            return { ...obj, posts: [], photos: [], videos: [] };
          });
          console.log("User data fetched successfully:", UpdatedData);
          setMockPeoples(UpdatedData);
        }
      }
      fetchAllUserList();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchUserSelectedData = async (selectedID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/peoples/${selectedID}`,
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
        const result = await response.json();
        
        const IMAGES = result.filter((post) => post.pictures && post.pictures.length > 0).flatMap((post) => post.pictures);

        // Update the user in mockPeoples with the fetched data
        setMockPeoples((prev) =>
          prev.map((user) =>
            user._id === selectedID ? { ...user, posts:result, photos:IMAGES  } : user
          )
        );
      }
    setSelectedId(selectedID);
    setTab("posts");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStarCount = async (postId) => {
  try {
    const response = await fetch(`http://localhost:5000/upload/${postId}/like`, {
      method: "POST", // or PUT, depending on your backend
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      const updatedPost = result.upload;

      // Update post inside selected user's posts
      setMockPeoples((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id !== selectedId) return user;

          const updatedPosts = user.posts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          );

          return { ...user, posts: updatedPosts };
        })
      );
    } else {
      console.error("Failed to like/unlike post");
    }
  } catch (error) {
    console.error("Error updating like:", error);
  }
};


  const filteredPeoples = mockPeoples.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  const selectedPerson = mockPeoples.find((p) => p._id === selectedId);

  console.log(selectedPerson, "selectedPerson");

  return (
    <div className="flex h-full w-full bg-[#111827] text-white min-h-screen p-2 md:p-6 box-border">
      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col w-1/3 max-w-xs border border-gray-700 rounded-xl bg-[#181f2a] p-4 mr-4`}
      >
        <input
          type="text"
          placeholder="Searching peoples...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 px-3 py-2 rounded border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none bg-[#232b39]"
        />
        <div className="flex flex-col gap-3">
          {filteredPeoples.map((person) => (
            <div
              key={person._id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
                ${
                  selectedId === person._id
                    ? "bg-[#232b39] border-yellow-500"
                    : "bg-[#222b38] border-gray-600 hover:bg-[#232b39]"
                }`}
              onClick={() => fetchUserSelectedData(person._id)}
            >
              <img
                src={person.profilePhoto}
                alt="avatar"
                className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600"
              />
              <span className="font-medium text-lg">{person.name}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main context */}
      <main
        className={`flex-1 flex flex-col border border-gray-700 rounded-xl bg-[#181f2a] p-4 ${
          selectedId === null ? "hidden md:flex" : ""
        }`}
      >
        {selectedPerson && (
          <>
            {/* Mobile back button */}
            <div className="md:hidden mb-4">
              <button
                className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 px-3 py-2 rounded border border-gray-700 bg-[#232b39]"
                onClick={() => setSelectedId(null)}
              >
                <span className="text-xl">&#8592;</span>
                <span>Back to peoples</span>
              </button>
            </div>
            <div className="flex items-center gap-4 mb-8 border-b border-gray-700 pb-4">
              <img
                src={selectedPerson.profilePhoto}
                alt="avatar"
                className="w-20 h-20 rounded-full bg-gray-700 border border-gray-600"
              />
              <span className="text-3xl font-semibold">
                {selectedPerson.name}
              </span>
            </div>
            <div className="flex border-b justify-around border-gray-700 mb-6">
              <button
                className={`px-6 py-2 font-semibold rounded-t-lg transition ${
                  tab === "posts"
                    ? "text-yellow-500 border-b-2 border-yellow-500 bg-[#232b39]"
                    : "text-gray-200 hover:bg-[#232b39]"
                }`}
                onClick={() => setTab("posts")}
              >
                POST
              </button>
              <button
                className={`px-6 py-2 font-semibold rounded-t-lg transition ${
                  tab === "photos"
                    ? "text-yellow-500 border-b-2 border-yellow-500 bg-[#232b39]"
                    : "text-gray-200 hover:bg-[#232b39]"
                }`}
                onClick={() => setTab("photos")}
              >
                PHOTOS
              </button>
              <button
                className={`px-6 py-2 font-semibold rounded-t-lg transition ${
                  tab === "videos"
                    ? "text-yellow-500 border-b-2 border-yellow-500 bg-[#232b39]"
                    : "text-gray-200 hover:bg-[#232b39]"
                }`}
                onClick={() => setTab("videos")}
              >
                VIDEOS
              </button>
            </div>
            {/* Section context */}
            {tab === "posts" && (
              <div className="space-y-6">
                {selectedPerson.posts.length === 0 ? (
                  <div className="text-gray-400">No posts yet.</div>
                ) : (
                  selectedPerson.posts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-[#222b38] border border-gray-700 rounded-xl p-5 flex flex-col gap-3 shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedPerson.profilePhoto}
                          alt="avatar"
                          className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600"
                        />
                        <span className="font-medium text-base">
                          {selectedPerson.name}{" "}
                          <span className="text-green-400">+</span>
                        </span>
                      </div>
                      <div className="text-gray-300 text-base">
                        {post.context}
                      </div>
                      {post.pictures && post.pictures.length > 0 && (
                        <div className="post-image-grid grid grid-cols-2 md:grid-cols-3 gap-3 my-3">
                        {post.pictures.map((picture, i) => (
                            <div key={i} className="rounded-lg overflow-hidden shadow hover:scale-105 transition-transform duration-200">
                            <img
                                src={picture}
                                alt={`Post ${i}`}
                                className="w-full h-32 object-cover bg-gray-800"
                            />
                            </div>
                        ))}
                        </div>
                    )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-blue-400 text-xs">
                          {post.like.length}
                        </span>
                        <span className="text-gray-400 text-xs" onClick={() => handleStarCount(post._id)}>★ Star</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {tab === "photos" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-1">
                {selectedPerson.photos.length === 0 ? (
                  <div className="col-span-full text-gray-400">
                    No photos yet.
                  </div>
                ) : (
                  selectedPerson.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden shadow-lg bg-gray-900 border border-gray-700 hover:scale-105 transition-transform duration-200 flex items-center justify-center p-2"
                    >
                      <img
                        src={photo}
                        alt={`photo-${idx}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-800"
                      />
                    </div>
                  ))
                )}
              </div>
            )}
            {tab === "videos" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {selectedPerson.videos.length === 0 ? (
                  <div className="col-span-full text-gray-400">
                    No videos yet.
                  </div>
                ) : (
                  selectedPerson.videos.map((video) => (
                    <div
                      key={video._id}
                      className="rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-700 p-3 flex flex-col gap-2"
                    >
                      <video
                        controls
                        className="w-full rounded-lg border border-gray-800"
                      >
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="mt-2 text-gray-200 text-sm">
                        {video.title}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Mobile: show people list only if no person is selected */}
      <div
        className={`md:hidden w-full p-4 border border-gray-700 rounded-xl bg-[#181f2a] mt-2 ${
          selectedId !== null ? "hidden" : ""
        }`}
      >
        <input
          type="text"
          placeholder="Searching peoples...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 px-3 py-2 rounded border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none bg-[#232b39]"
        />
        <div className="flex flex-col gap-3">
          {filteredPeoples.map((person) => (
            <div
              key={person._id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
                ${
                  selectedId === person._id
                    ? "bg-[#232b39] border-yellow-500"
                    : "bg-[#222b38] border-gray-600 hover:bg-[#232b39]"
                }`}
              onClick={() => fetchUserSelectedData(person._id)}
            >
              <img
                src={person.profilePhoto}
                alt="avatar"
                className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600"
              />
              <span className="font-medium text-lg">{person.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Peoples;
