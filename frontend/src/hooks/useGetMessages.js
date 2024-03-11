import React, { useEffect } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import axios from 'axios';

const useGetMessages = () => {
  const [loading, setLoading] = React.useState(false);
  const {messages,setMessages,selectedConversation} =useConversation();

  useEffect(()=>{
  const getMessages=async()=>{
    setLoading(true)
    try {
        const response = await axios.post(
            `http://localhost:5000/api/messages/${selectedConversation._id}`,
            JSON.stringify({token: localStorage.getItem('user') }),
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
        const data=await response.data
        setMessages(data)
    } catch (error) {
        console.log(error)
        toast.error('Failed to get messages')
    }finally{
      setLoading(false)}

  }
  if(selectedConversation?._id) getMessages()

  },[selectedConversation?._id,setMessages])

    return {loading, messages}

}

export default useGetMessages