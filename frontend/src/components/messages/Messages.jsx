import React from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeleton/MessageSkeleton'
import useListenMessages from '../../hooks/useListenMessages'

const Messages = () => {
  const {loading,messages} =useGetMessages()

  useListenMessages()

  console.log("messages",messages)
  return (
    <div className='px-4 flex-1 overflow-auto'>
        {loading && [...Array(3).map((_,i)=><MessageSkeleton key={i} />)]}
        {messages && messages.map(message=> <Message key={message._id} message={message} />)}
    </div>
  )
}

export default Messages