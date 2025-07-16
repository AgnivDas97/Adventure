import express from 'express';
import userMiddleware from "../middlewares/user-middleware.js";
import { userUpload, fetchUserUploadedData, postLikeController } from './userUploadControllers.js'; // Import the user upload controller

const router = express.Router(); // Correct usage

router.route("/").post(userMiddleware, userUpload);
router.route("/").get(userMiddleware, fetchUserUploadedData); // Optional: if you want to allow GET requests for uploads

// Route to handle likes on a post
router.route("/:postId/like").post(userMiddleware, postLikeController); // Assuming you have a postLikeController to handle likes


export default router;