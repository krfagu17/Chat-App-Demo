import User from "../models/userModel.js";

export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        // console.log("filteruser",filteredUser)
        res.status(200).json(filteredUser)
    } catch (error) {
        console.log("first error in getUserForSideBar: ", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}