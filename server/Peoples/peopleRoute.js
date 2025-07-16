import express from "express";
import userMiddleware from "../middlewares/user-middleware.js";
import {fetchPeoples, fetchSelectedData} from "./peopleControllers.js";

const router = express.Router()

router.route('/').get(userMiddleware, fetchPeoples)
router.route('/:selectedID').post(userMiddleware,fetchSelectedData)

export default router