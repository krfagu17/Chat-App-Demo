import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignIn from '../../hooks/useSignIn'

const Login = () => {

    const {logIn}= useSignIn()

    const [input, setInput] = useState({
        email: '',
        password: ''

    })

    const handleSubmit = (e) => {
        e.preventDefault()
        logIn(input)
        
    }
    return (
        <div className="min-w-96 mx-auto flex flex-col p-4  bg-blue-400 rounded-md bg-clip-padding backdrop-filter
     backdrop-blur-lg bg-opacity-10 border border-gray-100">
            <div>
            <h1 className=' text-black text-3xl' >Baat Chit</h1>
            </div>
            <div>
            <form onSubmit={handleSubmit}>
                <div >
                <label className='lable p-2'>
                    <span className=' text-base label-text'>Email</span>
                </label>
                <input type='text' className=' input w-full input-bordered ' value={input.email} 
                onChange={(e)=>setInput({...input,email:e.target.value})} />
                </div>
                <div>
                <label className='lable'>
                    <span className=' text-base label-text'>Password</span>
                </label>
                <input type='text' className=' input w-full input-bordered ' value={input.password}
                 onChange={(e)=>setInput({...input,password:e.target.value})}/>
                </div>
                <button className='p-2 mt-4 btn-block rounded-md bg-blue-600 text-white'>Login</button>
                <div className='flex flex-col gap-2'>
                <a href='#' className='text-blue-600'>Forgot Password?</a>
                <div>

                <span>
                    Don't have an account?
                </span>
                <Link to={"/signup"} className='text-blue-600'>Register</Link>
                </div>
                </div>
               
            </form>
            </div>
        </div>
    )
}

export default Login