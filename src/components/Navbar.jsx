import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiChatSmile2Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/operations/authAPI';

const Navbar = () => {
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <div className='w-full bg-[#20232F] h-16 px-auto flex flex-col items-center'>
        <div className='w-11/12 bg-[#20232F] h-20 px-auto flex items-center justify-between'>
        <Link to = "/">
            <div  className='flex items-center'>
                <RiChatSmile2Line className="text-[#00ff87] text-3xl" />
               
                <span className="bg-gradient-to-r from-[#00ff87] to-[#60efff] bg-clip-text text-transparent font-bold font-['Verdana','Times','Tahoma'] text-3xl">
                ChatHive
                </span>

                
            </div>
            </Link>

            {
                token===null && (
                    <div className='space-x-5'>
                    <Link to = "/signup">
                    <button className='rounded-md text-2xl border border-amber-200 px-2 py-2 text-gray-50'>Signup</button>
                    </Link>
                    
                    <Link to = "/login">
                        <button className='rounded-md text-2xl border border-amber-200 px-2 py-2 text-gray-50'>Login</button>
                        </Link>
                    
                    </div>
                )
            }

            {
                token !== null && (
                <div className='space-x-5'>
                <button className='rounded-md text-2xl border border-amber-200 px-2 py-2 text-gray-50'
                onClick = {() => dispatch(logout(navigate))}>Logout</button>
                </div>
                )
            }
        </div>
        
    <div className='w-full bg-amber-400 h-[1px]'>

    </div>
    </div>
  )
}

export default Navbar