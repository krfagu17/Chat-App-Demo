import React from 'react'
import useLogout from '../../hooks/useLogout'

const Logout = () => {
  const {logout,loading} = useLogout();

  return (
    <div onClick={logout} className=' my-auto p-3 btn btn-secondary cursor-pointer'>Logout</div>
  )
}

export default Logout