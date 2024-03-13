import bcrypt from "bcryptjs";

import userModel from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/tokenGenerator.js";

export const login = async (req, res) => {
 const {email,password}=req.body;
//  console.log("email",email,"password",password)
    try {
        const user = await userModel.findOne({email});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({message:"User does not exist"})
        }   
        //Generate token jwt    
       const token= generateTokenAndSetCookie(user._id,res);
    //    console.log("login token",token)
        res.status(200).json({message:"User logged in successfully",token:token,_id:user._id,username:user.username,email:user.email,fullName:user.fullName,})

    }catch (error) {
        console.log("Error in login",error)
    }
 
}


export const register = async(req, res) => {
   try {
    const {fullName,username,email,password,confirmPassword}=req.body;

    if(password !== confirmPassword){
        return res.status(400).json({message:"Password does not match"})
    }
    const user = await userModel.findOne({email});
    //check if user already exists
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    // HASHED PASSWORD
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);



    const newUser=new userModel({
        fullName,
        username,
        email,
        password:hashedPassword         
    })
   if(newUser){
    //Generate token jwt
        const token=generateTokenAndSetCookie(newUser._id,res);

       await newUser.save();
       res.status(201).json({message:"User registered successfully",token:token})
    }
    else{
        res.status(500).json({message:"Failed to register"})
    }

   } catch (error) {
    console.log("Error in register",error)
   }
}


export const logout = (req, res) => {
    
    try {
        res.cookie("jwt","",{maxAge:0})
        console.log("logout")

       return  res.status(200).json({message:"User logged out successfully"})  
    } catch (error) {
        console.log("Error in logout",error)
        res.status(500).json({message:"Failed to logout"})
    }
}