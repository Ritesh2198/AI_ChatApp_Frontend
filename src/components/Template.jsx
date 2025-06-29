import React from 'react'
//import frame from "../assets/frame.png"
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import {FcGoogle} from 'react-icons/fc'
import { GiStarShuriken } from "react-icons/gi";

const Template = ({title, desc1, desc2, formtype}) => {
  return (
    // <div className='flex justify-between w-11/12 max-w-[960px] py-12 mx-auto gap-x-12 gap-y-0'>
    //     <div className='w-11/12 max-w-[450px]'>
    //         <h1 className='text-gray-50 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
    //         <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
    //             <span className='text-gray-50'>{desc1}</span>
    //             <br></br>
    //             <span className='text-blue-300 italic'>{desc2}</span>
    //         </p>

    //         {formtype === "signup" ?
    //         (<SignupForm />) : 
    //         (<LoginForm />)}

    //         <div className='flex w-full items-center my-4 gap-x-2'>
    //             <div className='w-full h-[1px]  bg-gray-100'></div>
    //             <p className='text-gray-50 font-medium leading-[1.375]'>OR</p>
    //             <div className='w-full h-[1px] bg-gray-100'></div>
    //         </div>

    //         <button className='w-full flex justify-center items-center rounded-[8px] font-medium
    //         text-richblack-25 border border-gray-700 px-[12px] py-[8px] gap-x-2 mt-6'>
    //             <FcGoogle/>
    //             <p>Sign up with Google</p>
    //         </button>
    //     </div>

    //     <div className='w-11/12 h-full bg-gradient-to-r from-[#43B27F] to-[#45B07C] rounded-lg px-8 relative'>
    //         <div className='my-6'>
    //         <h2 className="font-italic font-['Verdana','Times','Century'] text-3xl text-gray-50">What's Our </h2>
    //         <h2 className="font-italic font-['Verdana','Times','Century'] text-3xl text-gray-50">Users Say.</h2>
    //         <h2 className="font-italic font-['Verdana','Times','Century'] text-3xl text-gray-50">"</h2>
    //         </div>

    //         <div>
    //             <p className="text-gray-100">"Staying connected has never been easier. Quick messages, seamless calls, and instant sharing—all in one place."</p>
    //         </div>

    //         <div className='my-5'>
    //             <p className='text-gray-50 font-semibold'>Alex Johnson</p>
    //             <p className='text-gray-100'>Chat Enthusiast</p>
    //         </div>

    //         <div className='w-11/12 bg-amber-50 rounded-lg px-5 py-10 space-y-4 mb-5 relative'>
    //             <p className='font-semibold'>"Join the conversation today and never miss a moment."</p>
    //             <p>Be among the first users to experience the easiest way to communicate.</p>
    //             <div className='rounded-full bg-black h-4 w-8'></div>
    //             <div className='h-15 w-15 rounded-full bg-[#45B07C] absolute -right-2 -top-3'></div>
    //             <div className='h-10 w-10 rounded-full text-2xl bg-gray-100 flex justify-center items-center absolute  -right-5 -top-6'><GiStarShuriken /></div>

    //         </div>

    //         <div className='w-20 h-20 rounded-full bg-black absolute -top-4 -right-4 '></div>
    //     </div>
    // </div>
    <div className="flex flex-col md:flex-row justify-between items-center h-full w-11/12 max-w-[960px] py-12 mx-auto gap-12 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 ">
   

      
      <div className="w-full md:w-1/2 max-w-[450px] text-center md:text-left p-2">
        <h1 className="text-gray-50 font-semibold text-3xl md:text-[1.875rem]">
          {title}
        </h1>
        <p className="text-lg leading-6 mt-4">
          <span className="text-gray-50">{desc1}</span>
          <br />
          <span className="text-blue-300 italic">{desc2}</span>
        </p>

        {formtype === "signup" ? <SignupForm /> : <LoginForm />}

        <div className="flex items-center my-4 gap-x-2">
          <div className="flex-1 h-[1px] bg-gray-100"></div>
          <p className="text-gray-50 font-medium">OR</p>
          <div className="flex-1 h-[1px] bg-gray-100"></div>
        </div>

        {/* <button className="w-full flex justify-center items-center rounded-lg font-medium text-richblack-25 border border-gray-700 px-4 py-2 gap-2 mt-6">
          <FcGoogle />
          <p>Sign up with Google</p>
        </button> */}
      </div>

      
      <div className="w-full md:w-1/2 bg-gradient-to-r from-[#43B27F] to-[#45B07C] rounded-lg p-6 md:px-8 relative">
        <div className="my-6 text-center md:text-left">
          <h2 className="italic font-serif text-3xl text-gray-50">
            What's Our
          </h2>
          <h2 className="italic font-serif text-3xl text-gray-50">Users Say.</h2>
          <h2 className="italic font-serif text-3xl text-gray-50">"</h2>
        </div>

        <p className="text-gray-100 text-center md:text-left">
          "Staying connected has never been easier. Quick messages, seamless
          calls, and instant sharing—all in one place."
        </p>

        <div className="my-5 text-center md:text-left">
          <p className="text-gray-50 font-semibold">Alex Johnson</p>
          <p className="text-gray-100">Chat Enthusiast</p>
        </div>

       
        <div className="bg-amber-50 rounded-lg p-5 md:p-6 space-y-4 mb-5 relative">
          <p className="font-semibold">"Join the conversation today and never miss a moment."</p>
          <p>Be among the first users to experience the easiest way to communicate.</p>
          <div className="rounded-full bg-black h-4 w-8"></div>
          <div className="h-10 w-10 rounded-full bg-[#45B07C] absolute -right-2 -top-3"></div>
          <div className="h-10 w-10 rounded-full text-2xl bg-gray-100 flex justify-center items-center absolute -right-5 -top-6">
            <GiStarShuriken />
          </div>
        </div>


        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black absolute -top-4 -right-4"></div>
      </div>
    </div>
  )
}

export default Template