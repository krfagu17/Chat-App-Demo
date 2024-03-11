import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { set } from 'mongoose'

const useGetConverstion = () => {
    // console.log("token",JSON.parse(localStorage.getItem('user')).token)
 const [loading, setLoading] = React.useState(false)    
    const [conversations, setConversations] = React.useState([])
    const getConverstion=async()=>{
        setLoading(true)
        try {
            const response= await axios({
                method:'post',
                url:'http://localhost:5000/api/users',
                data:localStorage.getItem('user'),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            setConversations(response.data)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getConverstion()
    }, [])

    return {conversations,loading}
    }

export default useGetConverstion