import jwt from "jsonwebtoken";
import User from "../models/user-model.js"

const authenticateToken = async (req, res, next) => {
    try {
        let token;

        // Try to get token from cookie
        if (req.cookies && req.cookies.jwtoken) {
            token = req.cookies.jwtoken;
        }
        // Or from Authorization header
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // replace with your actual secret

        // Optional: attach user data to request
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Token is not valid" });
    }
};

export default authenticateToken;
