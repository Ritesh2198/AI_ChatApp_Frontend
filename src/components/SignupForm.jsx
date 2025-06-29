import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUp } from '../services/operations/authAPI'

const SignupForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",

    })

    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] =useState(false)


    function changeHandler(event) {
        
        setFormData( (prevData) => (
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ))
    }

    function submitHandler (event) {
        event.preventDefault()
        
        if(formData.password!==formData.confirmPassword){
            toast.error("Password don't match");
            return;
        }
        dispatch(signUp(
            {  name : formData.name,
               email : formData.email,
               password : formData.password,
                confirmPassword : formData.confirmPassword,
                navigate : navigate
            }
           ));
    }

  return (
    <div>


        <form onSubmit={submitHandler}>

            <div className='flex gap-x-4 mt-[20px]'>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-gray-50 mb-1 leading-[1.375rem]'>Name<sup className='text-pink-400'>*</sup></p>
                    <input 
                        required
                        type="text"
                        name="name"
                        onChange={changeHandler}
                        placeholder='Enter Name'
                        value={formData.name}
                        className='bg-gray-800 rounded-[0.5rem] text-gray-100 w-full p-[12px]'/>
                </label>

                {/* <label className='w-full'>
                    <p className='text-[0.875rem] text-gray-50  mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-400'>*</sup></p>
                    <input 
                        required
                        type="text"
                        name="lastName"
                        onChange={changeHandler}
                        placeholder='Enter Last Name'
                        value={formData.lastName}
                        className='bg-gray-800 rounded-[0.5rem] text-gray-100 w-full p-[12px]'/>
                </label> */}

            </div>


            <div className='mt-[20px]'>
                <label className='w-full mt-[10px]'>
                    <p className='text-[0.875rem] text-gray-50  mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-400'>*</sup></p>
                    <input 
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder='Enter Email'
                        value={formData.email}
                        className='bg-gray-800 rounded-[0.5rem] text-gray-100 w-full p-[12px]'/>
                </label>
            </div>

            <div className='w-full flex gap-x-4 mt-[20px]'>
                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-gray-50  mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-400'>*</sup></p>
                    <input 
                        required
                        type={showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder='Enter Password'
                        value={formData.password}
                        className='bg-gray-800 rounded-[0.5rem] text-gray-100 w-full p-[12px]'/>

                    <span 
                    className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={() => setShowPassword((prev) => !prev)}>
                       {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>


                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-gray-50  mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-400'>*</sup></p>
                    <input 
                        required
                        type={showPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        className='bg-gray-800 rounded-[0.5rem] text-gray-100 w-full p-[12px]'/>

                    <span 
                    className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}>
                       {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>
            </div>

            <button className='w-full bg-[#43B27F] rounded-[8px] font-medium text-gray-900 px-[12px] py-[8px] mt-4'>
                Create Account
            </button>

        </form>
    </div>
  )
}

export default SignupForm