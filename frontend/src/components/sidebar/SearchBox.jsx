import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import useGetConverstion from '../../hooks/useGetConverstion';
import toast from 'react-hot-toast';
const SearchBox = () => {

  const [search,setSearch]=useState("")
 const {setSelectedConversation}=useConversation();
 const {conversations}=useGetConverstion()
  const handleSubmit=(e)=>{
         e.preventDefault()
         if(!search) return;
         if(search.length <3){
         return  toast.error("search should have more than 3 char")
         }

         const conversation= conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()))
         if(conversation){
          setSelectedConversation(conversation);
          setSearch("")
         }else {
          return toast.error("No such id found")
         }
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
<input type='text' placeholder='Search' className='input input-bordered rounded-full' 
value={search} onChange={(e)=> setSearch(e.target.value)} />
<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<FaSearch className=' h-6 w-6 text-white' />
			</button>
    </form>
  )
}

export default SearchBox