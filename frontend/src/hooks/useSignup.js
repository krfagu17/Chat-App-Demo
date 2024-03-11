import { useState } from 'react'
import toast from 'react-hot-toast';
import axio from 'axios'
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false)

    const {setUserAuth} = useAuthContext()

    const signup = async ({ fullName,email, username, password, confirmPassword,gender }) => {
        const success = handleInputError({ fullName, username,email, password, confirmPassword });
        if (!success) return;
        setLoading(true)

        try {
            const respose = await axio({
                method:'post',
                url:'http://localhost:5000/api/auth/register',
                data:JSON.stringify({fullName,email,username,gender,password,confirmPassword}),
                headers:{
                    'Content-Type':'application/json'
                }   
            })
        if(respose.status===201){
            toast.success('User registered successfully')
        }

        //use context to set user in local storage
        localStorage.setItem('user',JSON.stringify(respose.data))
        setUserAuth(respose.data)
            console.log(respose)
        } catch (error) {
            console.log("something went wrong",error)
            toast.error('Something went wrong', error)
        } finally {
            setLoading(false)
        }
    }
    return { signup, loading }
}

export default useSignup




const handleInputError = ({ fullName, username, password, confirmPassword }) => {
    if (!fullName || !username || !password || !confirmPassword) {
        toast.error('Please fill all the fields')
        return false
    }
    if (password !== confirmPassword) {
        toast.error('Password and Confirm Password do not match')
        return false
    }

    if (password.length < 6) {
        toast.error('Password should be atleast 6 characters long')
        return false
    }
    return true
}