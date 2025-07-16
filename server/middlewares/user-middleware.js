import jwt from "jsonwebtoken";
import User from "../models/user-model.js"

const userMiddleware=async (req, res, next)=>{
    const token =  req.header('Authorization')

    if(!token){
        return res.status(401).json({message:"Unauthorized HTTP, Token not vailed/wrong."})
    }

    const jwtToken = token.replace("Bearer ","")
    // //console.log(jwtToken,"token");

    try {
        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET)
        const userData = await User.findOne({email:isVerified.email}).select({password:0})

        req.user = userData;
        req.token = token;
        req.userID = userData._id

        next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized HTTP, Token not vailed/wrong."})
    }
    
}

export default userMiddleware