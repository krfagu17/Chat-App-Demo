import React from 'react'
import useConversation from '../zustand/useConversation.js'
import axios from 'axios';
import toast from 'react-hot-toast';

const useSendMessage = () => {
const [loading,setLoading] = React.useState(false);
const {messages,setMessages,selectedConversation} =useConversation();

const sendMessage=async(message)=>{
//  console.log("id",selectedConversation._id)
    setLoading(true)
    // console.log("tokens is found",localStorage.getItem('user'))
    try {
        const response = await axios.post(
            `http://localhost:5000/api/messages/send/${selectedConversation._id}`,
            JSON.stringify({ message, token: localStorage.getItem('user') }),
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          const data=await response.data

          setMessages([...messages,data])
          
          console.log("messages from backend",messages)
       
        
    } catch (error) {
        console.log(error)
        toast.error('Failed to send message')
        
    }finally{
      setLoading(false)  
    }
}
return {sendMessage,loading}
}

export default useSendMessage