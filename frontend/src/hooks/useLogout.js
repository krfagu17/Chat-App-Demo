import React from 'react'
import {useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useLogout = () => {
    const {setUserAuth} = useAuthContext()
 const [loading, setLoading] = React.useState(false)
 const navigate = useNavigate()
    const logout = () => {
        
        setLoading(true)
        try {
            localStorage.removeItem('user')
            setUserAuth(null)
            toast.success('Logged Out Successfully')
            navigate('/login')


        } catch (error) {
            console.log("something went wrong",error)
        } finally {
            setLoading(false)
        }
    }
    return { logout, loading }
}


export default useLogout