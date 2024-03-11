import mongoose from "mongoose";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
export const sendMessage = async (req, res) => {
   try {
    const {message}=req.body;
    console.log("body message structure",message)

    const {id:receiverID}=req.params;
    const receiverObjectId =new mongoose.Types.ObjectId(receiverID);
    // console.log("params",req.params)

    const senderID=req.user._id;
    // console.log(receiverID,senderID,messages)

    let conversation= await Conversation.findOne({
        
        participants:{
            $all:[senderID,receiverObjectId]
        }
    })
   
    console.log("yahan se pass ho gya bro")
    console.log(conversation,"conversation")
        console.log("conversation ye wala hai",conversation)
    console.log("senderID ye hai",senderID)
    console.log("receiver ye hai",receiverObjectId)
    console.log(senderID instanceof mongoose.Types.ObjectId); // should log true if senderID is an ObjectId
console.log(receiverObjectId instanceof mongoose.Types.ObjectId); // should log true if receiverID is an ObjectId
    if(conversation){console.log("new conversation")}
//     console.log("conversation ye wala hai",conversation)
//     console.log("senderID ye hai",senderID)
//     console.log("receiver ye hai",receiverObjectId)
//     console.log(senderID instanceof mongoose.Types.ObjectId); // should log true if senderID is an ObjectId
// console.log(receiverObjectId instanceof mongoose.Types.ObjectId); // should log true if receiverID is an ObjectId

if(!conversation){
    conversation= await Conversation.create({
      
        participants:[senderID,receiverObjectId],
        
    })
}
    if(conversation){
      conversation= await Conversation.create({
        
          participants:[senderID,receiverObjectId],
          
      })
      console.log("senderID ye hai",senderID)
        console.log("receiver ye hai",receiverObjectId)

      

      const newMessage= new Message({
        senderID:senderID,
          receiverID:receiverObjectId,
          message:message
      })
console.log(newMessage,"new message")
      if(newMessage){
            conversation.messages.push(newMessage._id)
            // await conversation.save()
            // await newMessage.save()
           //run in parallel
            await Promise.all([conversation.save(),newMessage.save()])
            console.log("conversation created")
            return res.json({message:{message},newMessage,newConversation:conversation})
        //    return res.status(200).json(message)
      }
    }
   } catch (error) {
    console.log("Error in sendMessage: ", error.message)
    res.status(500).json({ message: "Internal Server Error" });
   }
}

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId}=req.params;
        const user=req.user._id;

        const conversation= await Conversation.findOne({
            participants:{
                $all:[user,userToChatId]
            }
        }).populate("messages")

        console.log("conversation",conversation)

        if(!conversation){
           return res.status(200).json([])
        }
        const messages=conversation.messages;
        console.log(conversation,"conversation")
        

       return res.status(200).json(messages)

    } catch (error) {
        console.log("Error in Receiving Messages: ", error)
        res.status(500).json({ message: "Error in Receiving  Error" });
       }
    }
