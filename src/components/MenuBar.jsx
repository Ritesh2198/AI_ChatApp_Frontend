import React from 'react'
import {TbMenu} from "react-icons/tb";

const MenuBar = ({ toggleSidebar }) => {
  return (
    <div className='flex items-center justify-between bg-black p-2'>
      <button onClick={toggleSidebar} className='text-white'>
        <TbMenu className='text-2xl' />
      </button>
      <span className='text-white text-lg'>Chat App</span>
    </div>
  );
}

export default MenuBar