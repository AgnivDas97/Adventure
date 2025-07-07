import express from 'express';
import authController from '../controllers/auth-controller.js';
import {registerSchema, loginSchema} from '../validators/auth-validator.js';
import validate from '../middlewares/validate-middleware.js';
import authenticateToken from "../middlewares/authenticateToken.js"


const router = express.Router();

router.route('/').get(authController.home)
router.route('/register').post(validate(registerSchema) ,authController.register)

router.route('/login').post(validate(loginSchema),authController.login)


// router.get("/me", authenticateToken, (req, res) => {
//     res.json({ user: req.user });
// });



export default router;