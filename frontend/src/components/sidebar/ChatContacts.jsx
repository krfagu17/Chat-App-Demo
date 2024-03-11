import React from 'react'
import Conversation from './Conversation'
import useGetConverstion from '../../hooks/useGetConverstion'

const ChatContacts = () => {
  // const [conversations, setConversations] = React.useState([])
const {conversations,loading} = useGetConverstion()
console.log(conversations.map((conversation)=>conversation))
  //

console.log("conversations",)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation) => (
        <Conversation conversationData={conversation} key={conversation._id} name={conversation.fullName} />
      ))}
      
     
      </div>
  )
}

export default ChatContacts