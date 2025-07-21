import express from "express";
import userMiddleware from "../middlewares/user-middleware.js";
import {fetchPeoples, fetchSelectedData, fetchAllUploadedData} from "./peopleControllers.js";

const router = express.Router()

router.route('/').get(userMiddleware, fetchPeoples)
router.route('/:selectedID').post(userMiddleware,fetchSelectedData)
router.route('/alluser').get(userMiddleware, fetchAllUploadedData)

export default router