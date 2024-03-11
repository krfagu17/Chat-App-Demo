import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
const useSignIn = () => {
  const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const {setUserAuth} = useAuthContext()

    const logIn= async ({email,password}) => {
        setLoading(true)
        try {
            const respose = await axios({
                method:'post',
                url:'http://localhost:5000/api/auth/login',
                data:JSON.stringify({email,password}),
                headers:{
                    'Content-Type':'application/json'
                }   
            })
            if(respose.status===200){
                toast.success('Logged In Successfully')
                localStorage.setItem('user',JSON.stringify(respose.data))
                setUserAuth(respose.data)
                navigate('/')
            }
        } catch (error) {
            console.log("something went wrong",error)
            toast.error('Error while logging In', error)
            
        }
        setLoading(false)
    }
    return { logIn, loading }
}

export default useSignIn