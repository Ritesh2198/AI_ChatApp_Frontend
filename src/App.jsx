import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Homepage from './pages/Homepage'
import { Route,Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen h-screen bg-[#000000]  font-serif'>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<PrivateRoute><Homepage/></PrivateRoute>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path  = "/login" element = {<Login/>} />
      </Routes>

    </div>
  )
}

export default App
