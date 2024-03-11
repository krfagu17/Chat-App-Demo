import React from 'react'
import SearchBox from './SearchBox'
import ChatContacts from './ChatContacts'
import Logout from './Logout'

const SideBar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchBox />
        <div className=' divider px-3'></div>
        <ChatContacts />
        <Logout/>
    </div>
  )
}

export default SideBar