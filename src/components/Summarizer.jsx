import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { summarizeChat } from '../services/operations/MessageAPI';
import { setPage } from '../slices/chatSlice';
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import botAnimation from "../assets/Animation - 1741177335174.json";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Summarizer = ({isMobile}) => {

    const {messages} = useSelector((state)=>state.chat);
    const {token} = useSelector((state)=>state.auth);
    const [summary,setSummary] = useState();
    const {page} = useSelector((state)=>state.chat);
    const dispatch = useDispatch();

    const summarizeMessages = async() => {
            try{
                const data = await summarizeChat({messages},token)
                setSummary(data);
            }catch(error){
                console.log("Some error occured in GroupMessages",error)
            }
        }
  return (
    <div className="w-full p-4 my-5 flex flex-col items-center">
        {
            isMobile && page === 4 &&
            <div className='w-full'><IoArrowBackCircleSharp className='text-gray-500 text-4xl' onClick = {()=>dispatch(setPage(3))}/></div>
                
        }
      <motion.div
        initial={{ y:0, opacity:0.8}}
        animate={{ y: [-5,5,-5], opacity: [0.8,1,0.8]}}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative group"
      >
        <Lottie animationData={botAnimation} className="w-32 h-32" />
      </motion.div>
       
      <button  onClick={summarizeMessages} className="bg-blue-500 text-white p-2 rounded-md">
                Summarize Chat
                </button>
      

      {summary && (
        <div className="bg-gray-900 text-white p-4 rounded-md mt-4 max-h-full w-full 
        overflow-y-auto overflow-x-hidden break-words whitespace-pre-wrap 
        scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 shadow-lg">
          <h2 className="text-lg font-bold mb-2">Chat Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  )
      

}

export default Summarizer