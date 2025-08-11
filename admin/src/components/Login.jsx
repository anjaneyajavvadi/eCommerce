import React, { useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response=await axios.post(backendUrl+"/api/user/admin",{email,password});
      if(response.data.success){
          setToken(response.data.token);
          toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='font-bold text-2xl mb-4'>Admin Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email</p>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
            />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
            />
          </div>
          <button 
            type='submit'
            className='mt-2 w-full py-3 px-3 rounded-md text-white bg-black'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
