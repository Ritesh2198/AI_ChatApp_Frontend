import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { login } from '../services/operations/authAPI'

const LoginForm = () => {

    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState( {
        email:"", password:""
    })

    const [showPassword, setShowPassword] = useState(false)

    function changeHandler(event) {
        
        setFormData( (prevData) => (
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault()
        
        dispatch(login({
            email : formData.email,
            password : formData.password,
            navigate
        }
        ));

    }

  return (
    <form onSubmit={submitHandler}
    className='flex flex-col w-full gap-y-4 mt-6'>
        <label className='w-full'>
            <p className='text-[0.875rem] text-gray-50 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-400'>*</sup>
            </p>
            <input 
                required
                type="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter email id'
                name='email'
                className='bg-gray-800 rounded-[0.5rem]  text-gray-100 w-full p-[12px]'/>
        </label>

        
        <label className='relative w-full'>

            
            <p className='text-[0.875rem]  text-gray-50 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-400'>*</sup>
            </p>
            <input 
                required
                type={showPassword ? ("text") : ("password")}
                value={formData.password}
                onChange={changeHandler}
                placeholder='Enter Password'
                name='password'
                className='bg-gray-800 rounded-[0.5rem] text-gray-100 w-full p-[12px]'/>

            
            <span
            className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>

            {/* <Link to='#'>
                <p className='text-xs mt-1 text-blue-400 max-w-max ml-auto'>
                    Forget Password
                </p>
            </Link> */}
        </label>

        <button className='bg-[#43B27F] rounded-[8px] font-medium text-gray-900 px-[12px] py-[8px] mt-4'>
            Sign In
        </button>

    </form>
  )
}

export default LoginForm