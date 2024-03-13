import React from 'react'
import { AuthContextProvider, useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'

const Message = ({message}) => {
console.log("messages",message && message.newMessage && message.newMessage.message)
  const {userAuth} =useAuthContext()
  const {selectedConversations}=useConversation()
  const fromMe=message.senderID===userAuth._id

  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // console.log("fromeME ",fromMe)
  // console.log(message,"message")
  // console.log("in message box",message.newMessage.senderID)
  return (
    <div className={`chat ${chatClassName}`}>
        <div className=' chat-image avatar'>
            <div className=' w-10 rounded'>
           <img src="bg.jpg" alt="" />
            </div>
        </div>
        <div className=' chat-bubble bg-sky-400 text-white rounded-lg p-2'>
           {message && message.newMessage.message}
        </div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>22:12</div>
    </div>
  )
}

export default Message