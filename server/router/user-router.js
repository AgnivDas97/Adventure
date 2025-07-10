import express from 'express';
import contactForm from '../controllers/contact-controller.js';
import userData from "../controllers/user-controller.js"
import userMiddleware from "../middlewares/user-middleware.js"


const router = express.Router();

router.route('/').get( userMiddleware ,userData)
router.route('/contact').post(contactForm)

export default router;