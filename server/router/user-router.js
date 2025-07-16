import express from 'express';
import contactForm from '../controllers/contact-controller.js';
import {userData, allUsers} from "../controllers/user-controller.js"
import userMiddleware from "../middlewares/user-middleware.js"


const router = express.Router();

router.route('/').get( userMiddleware ,userData)
router.route('/peoples').get(userMiddleware, allUsers) // Assuming you want to allow POST requests to the same route
router.route('/contact').post(contactForm)

export default router;