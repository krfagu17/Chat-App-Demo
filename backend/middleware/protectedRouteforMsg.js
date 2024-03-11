import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import generateTokenAndSetCookie from '../utils/tokenGenerator.js';

const protectedRouteforMsg = async(req, res, next) => {
             
    
    try {
        const tokens=JSON.parse(req.body.token);
        
        console.log("token frontend found",tokens.token)
        if(!tokens) return res.status(401).json({message:"Token not found"})
        
        
        const decoded=jwt.verify(tokens.token,process.env.JWT_SECRET)
   

        if(!decoded) return res.status(401).json({message:"Invalid Token"})

        const user=await userModel.findById(decoded.userId).select("-password");

        if(!user) return res.status(401).json({message:"User does not exist"})
        req.user=user;

       

        next();



    } catch (error) {
        console.log("Error in protectedRoute: ", error.message)
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export default protectedRouteforMsg;