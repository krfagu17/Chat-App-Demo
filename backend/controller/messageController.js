import mongoose from "mongoose";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId,io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
   try {
    const {message}=req.body;
    // console.log("body message structure",message)

    const {id:receiverID}=req.params;
    const receiverObjectId =new mongoose.Types.ObjectId(receiverID);
    console.log("params",req.params)
    console.log("receiversObjectid",receiverObjectId)

    const senderID=req.user._id;
    // console.log(receiverID,senderID,messages)

    let conversation= await Conversation.findOne({
        
        participants:{
            $all:[senderID,receiverObjectId]
        }
    })
   

    if(conversation){console.log("new conversation")}


if(!conversation){
    conversation= await Conversation.create({
      
        participants:[senderID,receiverObjectId],
        
    })
}
    if(conversation){
      conversation= await Conversation.create({
        
          participants:[senderID,receiverObjectId],
          
      })
    //   console.log("senderID ye hai",senderID)
    //     console.log("receiver ye hai",receiverObjectId)

      

      const newMessage= new Message({
        senderID:senderID,
          receiverID:receiverObjectId,
          message:message
      })

      if(newMessage){
            conversation.messages.push(newMessage._id)
      }
      
            // await conversation.save()
            // await newMessage.save()
           //run in parallel
            await Promise.all([conversation.save(),newMessage.save()])
            console.log("yaha se nhi huwa")
               console.log(receiverObjectId)
           console.log("ye v kardo",getReceiverSocketId(receiverObjectId))
            const receiverSocketId=getReceiverSocketId(receiverObjectId)
            console.log(" first and lst message")

            if(receiverSocketId){
            // io.to(<socket_id>).emit() used to send events to specific client 

                io.to(receiverSocketId).emit("newMessage",newMessage)
                console.log("new message sent")
            }

          
            return res.json({message:{message},newMessage,newConversation:conversation})
       
      
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

        // console.log("conversation",conversation)

        if(!conversation){
           return res.status(200).json([])
        }
        const messages=conversation.messages;
        // console.log(conversation,"conversation")
        

       return res.status(200).json(messages)

    } catch (error) {
        console.log("Error in Receiving Messages: ", error)
        res.status(500).json({ message: "Error in Receiving  Error" });
       }
    }
