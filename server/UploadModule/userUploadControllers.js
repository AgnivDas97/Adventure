import UserUploadModel from "./userUploadModel.js";

export const userUpload = async (req, res) => {
    try {
        const { context, pictures } = req.body;
        const user = req.user; // Get user from middleware

        if (!user || !user._id) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        if (!context) {
            return res.status(400).json({ message: "Context is required" });
        }

        const newUpload = await UserUploadModel.create({
            user: user._id,
            context,
            pictures,
            like : [], // Default like count
        });
        console.log(newUpload, "New upload created");
        
        return res.status(200).json({ message: "File uploaded successfully", newUpload });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetchUserUploadedData = async (req, res) => {
    try {
        const user = req.user; // Get user from middleware

        if (!user || !user._id) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const uploads = await UserUploadModel.find({ user: user._id }).populate('user', 'name email');

        if (uploads.length === 0) {
            return res.status(404).json({ message: "No uploads found for this user" });
        }

        return res.status(200).json({ uploads });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const postLikeController = async (req, res) => {
  try {
    const { postId } = req.params;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const upload = await UserUploadModel.findById(postId);

    if (!upload) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userIdStr = user._id.toString();
    const alreadyLiked = upload.like.includes(userIdStr);

    if (alreadyLiked) {
      // If already liked, remove the like (toggle off)
      upload.like = upload.like.filter((id) => id !== userIdStr);
    } else {
      // Otherwise, add the user's like
      upload.like.push(userIdStr);
    }

    await upload.save();

    return res.status(200).json({
      message: alreadyLiked ? "Post unliked successfully" : "Post liked successfully",
      upload
    });
  } catch (error) {
    console.error("Like controller error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
