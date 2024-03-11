import React from 'react'

import useConversation from "../../zustand/useConversation.js"

const Conversation = ({name,conversationData}) => {

  const {selectedConversation,setSelectedConversation} = useConversation()

  const isSelected = selectedConversation?._id===conversationData._id
  
  return (
    <div className={`p-2 flex items-center justify-between hover:bg-sky-400 transition-all
    ${isSelected ? "bg-sky-400":null}`}
    onClick={()=>{setSelectedConversation(conversationData)
    console.log("selected",selectedConversation)
    }}
    >
        <div className='flex items-center gap-2'>
            <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photos.png" className=' h-12 w-12' alt="" /> <span>{name}</span>
        </div>
        <div>
            <img src="bg.jpg" className='h-6 w-6' alt="" />
        </div>
    </div>
  )
}

export default Conversation