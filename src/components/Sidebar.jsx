import React, { useState } from 'react'
import Friends from './Friends';
import { useDispatch, useSelector } from 'react-redux';
import { MdGroupAdd } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { TbUserCircle } from "react-icons/tb";
import { LiaUserSecretSolid } from "react-icons/lia";
// import { setTab} from ".//slices/chatSlice"
import { TbMenu } from "react-icons/tb";

import { setTab ,setPage} from '../slices/chatSlice';

const Sidebar = ({isMobile}) => {
    // const [tab,setTab] = useState();
    const tabs = [
      { name : "Friends", icon : <TbUserCircle className='text-2xl'/>},
      { name : "Groups", icon : <MdGroups2 className='text-2xl'/>},
      { name : "Requests", icon : <MdGroupAdd className='text-2xl'/>},
      { name : "Users", icon : <LiaUserSecretSolid className='text-2xl'/>},
    ];

    const dispatch = useDispatch();
    const {tab} = useSelector((state)=>state.chat);
  return (
    <div className='w-full h-full flex flex-col items-center bg-black gap-3 p-2 relative'>
      {isMobile &&
      <TbMenu className="text-4xl text-gray-500 absolute top-0 left-0"
      onClick = {() => dispatch(setPage(1))}/>}
    {tabs.map(({ name, icon }) => (
      <div
        key={name}
        className={`w-10/12 p-2 rounded-lg flex gap-2 items-center cursor-pointer transition ${
          tab === name ? "text-black bg-[#F3FC8A]" : "text-[#A6A6A6] hover:bg-gray-800"
        }`}
        onClick={() => {dispatch(setTab(name));dispatch(setPage(2))}}
      >
        {icon}
        <span>{name}</span>
      </div>
    ))}
  </div>
    
  )
}



// const Sidebar = ({ closeSidebar }) => {
//   const tabs = [
//     { name: "Friends", icon: <TbUserCircle className='text-2xl' /> },
//     { name: "Groups", icon: <MdGroups2 className='text-2xl' /> },
//     { name: "Requests", icon: <MdGroupAdd className='text-2xl' /> },
//     { name: "Users", icon: <LiaUserSecretSolid className='text-2xl' /> },
//   ];

//   const dispatch = useDispatch();
//   const { tab } = useSelector((state) => state.chat);

//   return (
//     <div className='w-64 h-full bg-black p-3'>
//       <button onClick={closeSidebar} className='text-white mb-4'>Close</button>
//       {tabs.map(({ name, icon }) => (
//         <div
//           key={name}
//           className={`flex items-center p-2 cursor-pointer transition
//           ${tab === name ? "text-black bg-[#F3FC8A]" : "text-[#A6A6A6] hover:bg-gray-800"}`}
//           onClick={() => {
//             dispatch(setTab(name));
//             closeSidebar(); // Close sidebar on selection in mobile
//           }}
//         >
//           {icon}
//           <span className='ml-2'>{name}</span>
//         </div>
//       ))}
//     </div>
//   );
// }


export default Sidebar