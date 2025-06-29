import React, { useState,useEffect,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGroupMessage } from '../services/operations/GroupAPI';
import { getAllMessages, summarizeChat } from '../services/operations/MessageAPI';
import { setMessages, setPage } from '../slices/chatSlice';
import { LuSend } from "react-icons/lu";
import { io } from "socket.io-client";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Summarizer from './Summarizer';
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import botAnimation from "../assets/Animation - 1741177335174.json";

const socket = io("http://localhost:3000",{
    transports: ["websocket", "polling"]
});


const Messagebar = ({isMobile}) => {
    const {receiverId,groupId,selectedChat} = useSelector((state)=>state.chat);
    const {messages} = useSelector((state)=>state.chat);
    const [newMessage,setNewMessage] = useState("");
    const {token} = useSelector((state)=>state.auth);
    const {tab} = useSelector((state)=>state.chat);
    const {user} = useSelector((state)=>state.auth);
    const {page} = useSelector((state)=>state.chat);
    const dispatch = useDispatch();

  

    const messagesEndRef = useRef(null);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    

    useEffect(() => {
        const chatRoom = groupId || [user?._id, receiverId].sort().join("-");
        socket.emit("join_chat", chatRoom);
    }, [user?._id, receiverId, groupId]);

    
    useEffect(() => {
        socket.on("receive_message", (newMessage,selectedReceiverId,selectedGroupId) => {
            if((selectedGroupId && selectedGroupId === groupId) || (selectedReceiverId && selectedReceiverId === receiverId) )
            dispatch(setMessages([...messages, newMessage]));
        });

        return () => {
            socket.off("receive_message");
        };
    }, [messages]);

    
    const sendMessage = () => {
        if (newMessage.trim() === "") return;
        const data = { senderId: user._id, receiverId, groupId, message : newMessage };
        socket.emit("send_message", data);
        setNewMessage("");
    };


    const getMessages = async() =>{
        try{
            const data = await getAllMessages({receiverId},token);

            dispatch(setMessages(data));

        }catch(error){
            console.log("Some error occured in messages",error)
        }
    }
    const getGroupMessages = async() =>{
        try{
            const data = await getAllGroupMessage({groupId},token);

            dispatch(setMessages(data));


        }catch(error){
            console.log("Some error occured in GroupMessages",error)
        }
    }


    useEffect(() => {
        if(groupId){
            getGroupMessages();
        }
        if(receiverId){
            getMessages();
        }
        console.log("RECEIVER",groupId,receiverId)
    },[groupId,receiverId])
  return (
    <div className='w-full h-[calc(100vh-7.5rem)] bg-[#1D1E24] my-10 rounded-t-4xl relative flex flex-col mx-2'>
      <div className='w-full bg-[#000000] h-14 rounded-t-4xl flex-shrink-0 flex items-center gap-4 p-6'>
        {
          (groupId || receiverId) && (
            <div className="flex items-center gap-2">
            
              {
                isMobile && page === 3 &&
                <IoArrowBackCircleSharp className='text-gray-500 text-4xl' onClick = {()=>dispatch(setPage(2))}/>
              }
            <img src={`${selectedChat?._id == receiverId ? selectedChat?.image : selectedChat?.avatar}`}
              width={40}
              alt=''
            />
            <span className='text-gray-50 font-bold text-2xl'>{selectedChat?.name}</span>
            </div>
           
          )
        }
         </div>
      

      <div className='flex flex-col w-full flex-grow overflow-auto my-5 gap-3'>
        {messages?.length > 0 ? (
          messages?.map((message, index) => (
            <div key={index} className={`w-full text-gray-50 text-xl flex items-center ${(message.senderId?._id === user._id || message.senderId === user._id)  && "justify-end " }  gap-2 p-2`}>
              {!(message.senderId?._id === user._id || message.senderId === user._id) && 
                <img src={message.senderId.image}
                 
                  className="rounded-full object-cover h-10 w-10 flex-shrink-0"
                />
              }
              <div className={`flex flex-col max-w-[75%] overflow-hidden`}>
                {tab === "Groups" && message.senderId?._id !== user._id && (
                  <span className='text-[16px] text-amber-600'>{message.senderId.name}</span>
                )}
                <div className={`p-2 ${(message.senderId?._id === user._id || message.senderId === user._id) ? " bg-[#B785F5] " :  "bg-[#16171B]"} rounded-lg text-xl overflow-hidden`}>
                  <p className='break-words whitespace-normal'>{message.message}</p>
                </div>
              </div>
              {(message.senderId?._id === user._id || message.senderId === user._id) && 
                <img src={message.senderId.image}
                  
                  className="rounded-full object-cover h-10 w-10 flex-shrink-0"
                />
              }
            </div>
          ))
        ) : (
          <div className='text-amber-300'>You have no messages</div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

        <span className='absolute bottom-10 left-0 group'
        onClick = {()=> dispatch(setPage(4))}>
        {
          isMobile && (
            <motion.div
            initial={{y:0,opacity:0.8}}
            animate={{y:[-5,5,-5],opacity:[0.8,1,0.8] }}
            transition={{repeat:Infinity,duration:2,ease:"easeInOut" }}
            className="relative"
          >
            <Lottie animationData={botAnimation} className="w-32 h-32" />
            <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      invisible group-hover:visible bg-black/60 text-white 
                      text-sm px-3 py-1 rounded-md shadow-md">
        Summarize
      </div>
          </motion.div>
          )
        }
        </span>
        
      <div className='w-full flex items-center justify-center my-2'>
        <div className='w-11/12 bg-[#16171B] h-12 rounded-2xl relative'>
          <input className='w-full h-full text-amber-50 p-2 rounded-2xl'
            type="text"
            value={newMessage}
            placeholder='Enter message'
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <LuSend className='bg-[#F3FC8C] w-10 h-10 p-2 rounded-xl absolute right-2 top-1'
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>

  )
}

export default Messagebar

