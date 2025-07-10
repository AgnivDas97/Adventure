import express from 'express';
import userMiddleware from '../../middlewares/user-middleware.js';
import { accesChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } from '../chat-controllers/chatControllers.js';



const router = express.Router();


router.route("/").post(userMiddleware, accesChat)
router.route("/").get(userMiddleware, fetchChats);
router.route("/group").post(userMiddleware,createGroupChat)
router.route("/rename").put(userMiddleware,renameGroup)
router.route("/groupremove").put(userMiddleware,removeFromGroup)
router.route("/groupadd").put(userMiddleware,addToGroup)

export default router;