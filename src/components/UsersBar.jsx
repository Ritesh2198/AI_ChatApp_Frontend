import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, getAllFriends, getAllRequests, getAllUsers, rejectFriendRequest, sendFriendRequest} from '../services/operations/FriendAPI';
import { createGroup ,getAllGroups} from '../services/operations/GroupAPI';
import { setTab ,setGroupId,setReceiverId,setMessages,setSelectedChat,setPage} from '../slices/chatSlice';
import { IoIosAddCircle } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import {toast} from "react-hot-toast";
import { TbMenu } from "react-icons/tb";

const UsersBar = ({isMobile}) => {
    const {tab,receiverId,groupId} = useSelector((state) => state.chat);
    const {token} = useSelector((state) => state.auth);
    const [friends,setFriends] = useState([]);
    const [requests,setRequests] = useState([]);
    const [members,setMembers] = useState([]);
    const [groupName,setGroupName] = useState("");
    const [groups,setGroups] = useState([]);
    const [allUsers,setAllUsers] = useState([]);
    const [query,setQuery] = useState("");

    const dispatch = useDispatch();

    const handleMembers = (memberId) => {
        members.includes(memberId) ? 
        (
            setMembers((members) => members.filter((member) => member !== memberId))
        ) : ( setMembers((members) => [...members,memberId]));
    }


    useEffect(() => {
    },[members])

    const fetchData = async () => {
        try {
            if (!token) return;

            const [friendsData, requestsData,groupsData,allUsersData] = await Promise.all([
                getAllFriends(token),
                getAllRequests(token),
                getAllGroups(token),
                getAllUsers(token),
            ]);

            console.log("Fetched Friends:",friendsData);
            console.log("Fetched Requests:",requestsData);
            console.log("Fetched groups:",groupsData);
            console.log("Fetched users:",allUsersData);

            setFriends(friendsData || []);
            setRequests(requestsData || []);
            setGroups(groupsData || []);
            setAllUsers(allUsersData || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() =>{
        if(token) {
            fetchData();

        }
        dispatch(setMessages([]));
        console.log("Tab",tab);
        dispatch(setGroupId(null));
        dispatch(setReceiverId(null));
    },[tab,token]);

    const createGroupHandler = async(e) => {
        e.preventDefault();
        try{
            const data = await createGroup({name : groupName,members},token);

            if(data){
                setMembers(() => {});
                dispatch(setTab("Groups"));
            }

        } catch(error){
            console.log("Error creating group",error);
        }
    }

    const handleId = (id,user) => {
        if (tab === "Groups") {
            dispatch(setGroupId(id));
            dispatch(setReceiverId(null));
        }
        if (tab === "Friends") {
            dispatch(setGroupId(null));
            dispatch(setReceiverId(id));
        }
        dispatch(setSelectedChat(user));
        console.log(tab,id);
    }

    const sendRequest =async(receiverId)=>{
        try{
            const data = await sendFriendRequest({receiverId},token);
            if(data){
                setAllUsers((allUsers)=>allUsers.filter((user)=> user._id !== receiverId));
            }

        } catch(error){
            console.log("Error sending request",error);
        }
    }

    const acceptRequest = async(senderId)=>{
        try{
            const data = await acceptFriendRequest({senderId},token);
            if(data){
                setRequests((requests)=>requests.filter((user)=> user.sender._id !== senderId));
            }

        } catch(error){
            console.log("Error accepting request",error);
        }
    }

    const rejectRequest = async(senderId)=>{
        try{
            const data = await rejectFriendRequest({senderId},token);
            if(data){
                setRequests((requests)=>requests.filter((user)=> user._id !== senderId));
            }

        } catch(error){
            console.log("Error accepting request",error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const tabArray= {
            Friends: friends,
            Users: allUsers,
            Requests: requests,
            Groups: groups
        };
        const searchArray = tabArray[tab];
        let conversationUser;
        if(tab!=="Requests")
        conversationUser = searchArray?.find((user)=> user.name.toLowerCase().includes(query.toLowerCase()));
        else
        conversationUser = searchArray?.find((user)=> user.sender.name.toLowerCase().includes(query.toLowerCase()));

        setQuery("");
        if (!conversationUser) {
            return toast.error("User not found!");
        }
    
        const tabStateMap = {
            Friends: setFriends,
            Users: setAllUsers,
            Requests: setRequests,
            Groups: setGroups
        };
    
        tabStateMap[tab]?.([conversationUser]);
    }


  return (
    <div className='h-full w-full flex flex-col items-center gap-5 relative'>
        {isMobile &&
        <TbMenu className="text-4xl text-black absolute top-0 left-0"
        onClick = {() => dispatch(setPage(1))}/>}
        <div className="w-full h-full flex flex-col items-center my-10 gap-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 rounded-md shadow-md">
            <form className={`w-10/12 flex my-2`}
            onSubmit={searchSubmitHandler}
            >
                    <input className='bg-[#16171B] rounded-lg h-10 text-amber-50 p-2 w-full'
                    type = "text"
                    value = {query}
                    placeholder='Search...'
                    onChange = {(e)=>setQuery(e.target.value)}>
                    </input>
                    <button type='submit'
                    className='bg-[#43B27F] rounded-lg p-2 h-10'>Search</button>
                
                
            </form>
        {
            tab === "Friends" && (
                
                friends?.length > 0 ? (
                    friends.map((friend, index) => (
        
                        <div key={index} className={`${friend._id===receiverId && "bg-[#16171B] rounded-2xl shadow-md"} w-10/12 text-gray-50 text-xl flex justify-between items-center gap-4 p-2 shadow-md`}
                        onClick = {()=>{handleId(friend._id,friend);dispatch(setPage(3))}}>
                            <div className='flex items-center gap-3 relative group'>
                                <img src={friend.image} className='w-10 h-10 rounded-full border border-gray-300 shadow-sm' />
                                
                                
                                <span className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]'>
                                    {friend.name}
                                </span>
                
                                
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-3 py-1 rounded shadow-lg">
                                    {friend.name}
                                </div>
                            </div>
                
                            
                        </div>
                    ))
                ) 
                :
                    (<div className='text-amber-300'>You have no friends</div>)
                
            )
        }

        {
            tab === "Requests" && (
                
                requests?.length > 0 ? (
                    requests.map((user, index) => (
                        <div key={index} className='w-full text-gray-50 text-xl flex justify-between items-center gap-5 p-2 bg-gray-800 rounded-md shadow-md'>
                            <div className='flex items-center gap-3 relative group'>
                                <img src={user.sender.image} className='w-10 h-10 rounded-full border border-gray-300 shadow-sm' />
                                
                                
                                <span className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]'>
                                    {user.sender.name}
                                </span>
                
                                
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-3 py-1 rounded shadow-lg">
                                    {user.sender.name}
                                </div>
                            </div>
                
                            <div className='flex gap-2'>
                                <div className='border border-amber-100 px-3 py-2 bg-emerald-500 rounded-lg shadow-md cursor-pointer hover:bg-emerald-600 transition'>
                                    <IoMdCheckmark className='text-2xl text-black' 
                                    onClick = {()=>acceptRequest(user.sender._id)}/>
                                    
                                </div>
                                <div className='border border-amber-100 px-3 py-2 bg-red-600 rounded-lg shadow-md cursor-pointer hover:bg-red-700 transition'>
                                    <FaXmark className='text-2xl text-black' 
                                    onClick = {()=>rejectRequest(user.sender._id)}/>
                                    
                                </div>
                            </div>
                            
                        </div>
                    ))
                ) 
                :
                    (<div className='text-amber-300'>You have no Requests</div>)
                
            )
        }

        {
            tab === "CreateGroup" && (
                <div className='w-full p-5'>
                    <form onSubmit={createGroupHandler} className='space-y-5'>
                        <div className='w-11/12 flex items-center'>
                        <input
                            type = "text"
                            placeholder='Group name'
                            value = {groupName}
                            onChange = {(e)=>setGroupName(e.target.value)}
                            className='bg-gray-800 rounded-[0.5rem] text-gray-100 w-11/12 p-[10px]'/>

                            <button type = "submit" className='bg-[#43B27F] rounded-lg p-[12px]'>Create</button>
                        </div>
                    
                    
                
                
                {friends?.length > 0 ? (
                    friends.map((friend, index) => (
                        <div key={index} className='w-8/12 text-gray-50 text-xl flex items-center gap-5'>
                            <input
                            type = "checkbox" 
                            onChange = {()=>handleMembers(friend._id)}
                            />
                            <img src = {friend.image}
                            width={40}/>
                            <span>{friend.name}</span>
                        </div>
                    ))
                ) 
                
                :
                    (<div className='text-amber-300'>You have no friends</div>)}

                    </form>
        
                    </div>

            )
        }

        {
            tab === "Groups" && (
                <div className='relative w-full my-2 flex flex-col items-center'>
                    <div 
                    onClick = {()=>dispatch(setTab("CreateGroup"))}
                    className='flex w-10/12 gap-2 items-center'>
                        <IoIosAddCircle className='text-5xl text-[#43B27F]'/>
                        <span className='text-gray-50 font-bold text-lg'>Create Group</span>
                    </div>
                    <div className='h-[0.5px] bg-gray-50'></div>
                    
                {groups?.length > 0 ? (
                    groups.map((group, index) => (

                        <div key={index} className={`${group._id===groupId && "bg-[#16171B] rounded-2xl shadow-md"} w-10/12 text-gray-50 text-xl flex justify-between items-center gap-5 p-2 shadow-md`}
                        onClick = {()=>{handleId(group._id,group);dispatch(setPage(3))}}>
                            <div className='flex items-center gap-3 relative group'>
                                <img src={group.avatar} className='w-10 h-10 rounded-full border border-gray-300 shadow-sm' />
                                
                                
                                <span className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]'>
                                    {group.name}
                                </span>
                
                                
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-3 py-1 rounded shadow-lg">
                                    {group.name}
                                </div>
                            </div>
                
                            
                        </div>
                    ))
                ) 
                :
                    (<div className='text-amber-300'>You have no groups</div>)}
                </div>
                
            )
        }

        {
            tab === "Users" && (
                
                allUsers?.length > 0 ? (
                    allUsers.map((user, index) => (
                        <div key={index} className='w-10/12 text-gray-50 text-md flex justify-between items-center gap-5 p-2 rounded-md shadow-md'>
                            <div className='flex items-center gap-3 relative group'>
                                <img src={user.image}  className='w-10 h-10 rounded-full border border-gray-300 shadow-sm' />
                                
                                
                                <span className='whitespace-nowrap overflow-hidden text-sm text-ellipsis max-w-[150px]'>
                                    {user.name}
                                </span>
                
                                
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-sm px-3 py-1 rounded shadow-lg">
                                    {user.name}
                                </div>
                            </div>
                
                        
                            <div className='border border-amber-100 px-2 py-2 bg-emerald-500 rounded-lg shadow-md cursor-pointer hover:bg-emerald-600 transition'>
                                <IoMdPersonAdd className='text-2xl text-black' 
                                onClick = {()=>sendRequest(user._id)}/>
                            </div>
                        </div>
                        
                    ))
                )
                : (<div className='text-amber-300'>No users found</div>)
                
            )
        }


    </div>
   
    </div>
    
  )
}

export default UsersBar



