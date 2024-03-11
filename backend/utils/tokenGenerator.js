import jwt from "jsonwebtoken";

const generateTokenAndSetCookie= (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    console.log("backend token",token)
    res.cookie("token",token,{
        httpOnly:true,          //cookie cannot be accessed by client side script
        maxAge:7*24*60*60*1000, 
        sameSite:"strict",      //cookie will only be sent in a first-party context and not be sent along with requests initiated by third party websites.
    })
    return token;

}

export default generateTokenAndSetCookie;