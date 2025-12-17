import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../api';

function Register() {
  const[form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post(`${baseUrl}/auth/register`, form);
      navigate("/");
    }catch(err){
      alert("Register Failed");
    }
  }

  return (
        <div className='p-6 max-w-sm mx-auto'>
        <h2 className='text-xl font-bold mb-4'>Register Page</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <label className='block'>Name</label>
            <input name='name' onChange={handleChange} type="text" className='border p-2 w-full' />
             <label className='block'>Email</label>
            <input name='email' onChange={handleChange} className='border p-2 w-full' type="email" />
             <label className='block'>password</label>
            <input name='password' onChange={handleChange} className='border p-2 w-full' type="password" />
             <label className='block'>Role</label>
            <input name='role' onChange={handleChange} type="text" className='border p-2 w-full' />
            <button className='bg-blue-500 text-white p-2 w-full'>Register</button>
        </form>
        <p className='mt-4 text-gray-600 font-semibold'>Already have an account <span><Link className='text-blue-500 font-exrabold' to="/">Login</Link></span></p>
    </div>

  )
}

export default Register