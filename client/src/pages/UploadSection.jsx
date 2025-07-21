import React from "react";
import "../style/UploadSection.css";
import { useAuth } from "../Store/auth";

const UploadSection = () => {
  const [context, setContext] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [imagePreviews, setImagePreviews] = React.useState([]);

  const { user, token } = useAuth();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (
      files.every(
        (image) => image.type === "image/jpeg" || image.type === "image/png"
      )
    ) {
      for (let image of files) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "chat-app");
        formData.append("Cloud_name", "dyekscdns");
        try {
          fetch("https://api.cloudinary.com/v1_1/dyekscdns/image/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Image uploaded successfully:", data);
              setImages((prevImages) => [...prevImages, data.url.toString()]); // Store the image URL
              // PICTURES.push(data.url.toString()); // Store the image URL
            });
        } catch (error) {
          console.log("Error uploading image:", error);
          alert("Error uploading image. Please try again.");
          return;
        }
      }
    } else {
      alert("Please upload only image files (JPEG or PNG).");
      return;
    }

    // Generate preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  console.log("Images:", images);

  const handleSelectContext = async () => {
    if (context.trim() === "") {
      alert("Please enter some text before uploading.");
      return;
    }

    // Here you would typically handle the upload logic, e.g., sending the context to a server.
    console.log("Context uploaded:", context);
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ context, pictures: images }),
      });
      if (response.ok) {
        console.log("Context uploaded successfully");
        alert("Context uploaded successfully");
      } else {
        console.error("Failed to upload context");
        alert("Failed to upload context. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading context:", error);
      alert("Failed to upload context. Please try again.");
    }
    setContext(""); // Clear the input after upload
  };

  return (
    <div>
      <main className="create-container">
        <form className="post-form">
          <div className="post-top flex items-start gap-3 p-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
              <img
                src={user?.profilePhoto}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <textarea
              rows="4"
              placeholder="Share something..."
              onChange={(e) => setContext(e.target.value)}
              className="bg-[#0f172a] text-white w-full rounded-lg p-3 outline-none resize-none border border-gray-700 placeholder:text-gray-400"
            ></textarea>
          </div>
          {/* add a multiple image upload option here */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Add Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-16 h-16 object-cover rounded border border-gray-700"
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="upload-btn"
            onClick={handleSelectContext}
          >
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
