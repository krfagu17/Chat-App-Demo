import React from 'react'
import MessageContainer from '../../components/sidebar/MessageContainer'
import SideBar from '../../components/sidebar/SideBar'

const Home = () => {
  return (
    <div className='flex sm:h-[490px] md:h-[550px] rounded-lg overflow-hidden bg-gray-500 shadow- backdrop-filter bg-opacity-0 backdrop-blur-lg'>
        <SideBar />
        <MessageContainer />
    </div>
  )
}

export default Home