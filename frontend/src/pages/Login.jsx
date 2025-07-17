import React, { useEffect, useState } from 'react'

const Login = () => {

  const onSubmitHandler=async(event)=>{
    event.preventDefault();
  }
  
  const [currentState,setCurrentState] = useState('Login'); 
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-2xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState==='Login'?'':<input type='text' className='border w-full px-3 py-2 border-gray-800' placeholder='Name' required/>}
      <input type='email' className='border w-full px-3 py-2 border-gray-800' placeholder='Email' required/>
      <input type='password' className='border w-full px-3 py-2 border-gray-800' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget Password?</p>
        {
          currentState==="Login"
          ? <p className='cursor-pointer' onClick={(e)=>setCurrentState('Sign up')}>Create Account</p>
          : <p className='cursor-pointer' onClick={(e)=>setCurrentState('Login')}>Login</p>
        }
      </div>
      <button className='bg-black text-white font-light text-xs px-8 py-2 mt-4'>{currentState}</button>
      <p className='text-sm text-gray-500'>Already have an account? <span className='text-[#414141] cursor-pointer' onClick={(e)=>setCurrentState('Sign in')}>Sign in</span></p>
    </form>
  )
}

export default Login