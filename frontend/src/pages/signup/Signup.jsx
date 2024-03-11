import React,{useState} from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'
import useLogout from '../../hooks/useLogout'

const Signup = () => {

  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword:'',
    gender:''

  })

  const {signup,loading}=useSignup()
  
  const GenderCheckbox = (gender) => {
    setInputs({...inputs,gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(inputs)
    
  }
  return (
    <div className='flex flex-col min-w-96 mx-auto justify-center items-center rounded-lg p-6'>
      <div className=' w-full p-6 rounded-lg shadow-md bg-gray-200 backdrop-filter bg-opacity-0 backdrop-blur-lg'>

<h1 className=' text-3xl font-semibold text-gray-300  text-center'>
  Signup
</h1>

<form onSubmit={handleSubmit}>
  <div>
    <label className='lable p-2'>
      <span className=' font-semibold text-base label-text'>Full Name</span>
    </label>
    <input type='text' className=' input w-full input-bordered h-10' value={inputs.fullName}
    onChange={(e)=>setInputs({...inputs,fullName:e.target.value})} />
  </div>
  <div>
    <label className='lable p-2'>
      <span className='font-semibold text-base label-text'>Username</span>
    </label>
    <input type='text' className=' input w-full input-bordered h-10' value={inputs.username} 
    onChange={(e)=>setInputs({...inputs,username:e.target.value})}/>
  </div>
  <div>
    <label className='lable p-2'>
      <span className='font-semibold text-base label-text'>Email</span>
    </label>
    <input type='text' className=' input w-full input-bordered h-10' value={inputs.email} 
    onChange={(e)=>setInputs({...inputs,email:e.target.value})}/>
  </div>
  <div>
    <label className='lable p-2'>
      <span className=' font-semibold text-base label-text'>Password</span>
    </label>
    <input type='text' className=' input w-full input-bordered h-10' value={inputs.password}
    onChange={(e)=>setInputs({...inputs,password:e.target.value})} />
  </div>
  <div>
    <label className='lable p-2'>
      <span className='font-semibold text-base label-text'>Confirm Password</span>
    </label>
    <input type='text' className=' input w-full input-bordered h-10' value={inputs.confirmPassword}
    onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})} />
  </div>
  <GenderCheckBox  onChangeGenderBox={GenderCheckbox} selectedGender={inputs.gender}/>
  <Link to={"/login"} className='text-blue-600'>Already have an account?</Link>
  <button className='p-2 mt-4 btn-block rounded-md bg-blue-600 text-white'>Signup</button>
</form>

      </div>

    </div>
  )
}

export default Signup