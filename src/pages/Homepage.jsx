import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import UsersBar from '../components/UsersBar'
import Messagebar from '../components/Messagebar'
import Summarizer from '../components/Summarizer'
import MenuBar from '../components/MenuBar';
import { TbMenu } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import {setPage} from '../slices/chatSlice';
import { motion } from "framer-motion";




const Homepage = () => {
  const {page} = useSelector((state)=>state.chat);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const transitionVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  };
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    return(


  

  
    <div className="w-full h-[calc(100vh-5rem)] bg-[#20232F] flex">
      {!isMobile ? (
        <>
          <div className="w-1/9 h-full">
            <Sidebar/>
          </div>
          <div className="w-2/12 h-full flex flex-col items-center justify-center font-serif italic">
            <UsersBar/>
          </div>
          <div className="w-5/11 h-full font-serif italic">
            <Messagebar/>
          </div>
          <div className="w-3/12 h-full">
            <Summarizer/>
          </div>
        </>
      ) : (
      

      <div className="w-full h-full overflow-hidden relative">
        {page === 1 && (
          <motion.div {...transitionVariants} className="absolute inset-0">
            <Sidebar isMobile />
          </motion.div>
        )}
        {page === 2 && (
          <motion.div {...transitionVariants} className="absolute inset-0">
            <UsersBar isMobile />
          </motion.div>
        )}
        {page === 3 && (
          <motion.div {...transitionVariants} className="absolute inset-0">
            <Messagebar isMobile />
          </motion.div>
        )}
        {page === 4 && (
          <motion.div {...transitionVariants} className="absolute inset-0">
            <Summarizer isMobile />
          </motion.div>
        )}
      </div>



      )}
    </div>
  );
    


}







// const Homepage = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleResize = () => {
//     setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
//   };

//   useEffect(() => {
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return(
//     <div className='flex w-full h-[calc(100vh-5rem)] bg-[#20232F]'>
//       {isMobile && (
//         <div className={`fixed left-0 top-0 h-full bg-black transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//           <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
//         </div>
//       )}
//       <div className='flex w-full md:flex-row'>
//         {isMobile && (
//           <div className='flex items-center justify-between bg-black p-2'>
//             <button onClick={() => setIsSidebarOpen(true)} className='text-white'>
//               <TbMenu className='text-2xl' />
//             </button>
//           </div>
//         )}
//         <div className='hidden md:block w-2/12 h-full'>
//           <Sidebar />
//         </div>
//         {/* <div className='flex-1 h-full flex flex-col'>
//           <div className='w-full md:w-1/3 h-full'>
//             <UsersBar />
//           </div>
//           <div className='flex-1 h-full'>
//             <Messagebar />
//           </div>
//         </div> */}
//         <div className='w-full md:w-2/12 h-full'>
//           <UsersBar />
//         </div>
//         <div className='flex-1 h-full'>
//           <Messagebar />
//         </div>
//         <div className='hidden md:block w-1/4 h-full'>
//           <Summarizer />
//         </div>
//       </div>
//     </div>
//   );
// };



export default Homepage