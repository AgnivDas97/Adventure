import express from "express";
import userMiddleware from "../../middlewares/user-middleware.js";
import {sendMessage, allMessages}  from "../chat-controllers/messageControllers.js";

const router = express.Router();


router.route("/:chatId").get(userMiddleware, allMessages);
router.route("/").post(userMiddleware, sendMessage);

export default router;