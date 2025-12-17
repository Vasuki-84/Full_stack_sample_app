import React from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div>

    <div className='flex justify-center items-center h-[600px]'>
        <div className='bg-green-200 p-8 rounded text-green-800 font-bold'>
            <h1 className='text-2xl'>Welcome to Dashboard</h1>
            <p className='text-md'>You're successfully logged in</p>
        </div>

    </div>
    <div className='p-6'>
        <button onClick={handleLogout} className='bg-red-200 text-red-500 font-semibold px-3 py-2 rounded cursor-pointer'>Logout</button>
    </div>
    </div>
  )
}

export default Dashboard