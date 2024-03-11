import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
        receiverID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        message:{
            type:String,
            required:true
        }
    
},{timeStamps:true})

const Message = mongoose.model('Message',messageSchema);

export default Message;