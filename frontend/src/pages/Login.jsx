import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentState, setCurrentState] = useState('Login'); // 'Login' or 'Sign Up'
  const [showPassword, setShowPassword] = useState(false);


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem('token', response.data.token);
          setToken(response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === 'Login') {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem('token', response.data.token);
          setToken(response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700"
    >
      {/* Title */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-2xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Name field only for Sign Up */}
      {currentState === 'Sign Up' && (
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border w-full px-3 py-2 border-gray-800"
          placeholder="Name"
          required
        />
      )}

      {/* Email field */}
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border w-full px-3 py-2 border-gray-800"
        placeholder="Email"
        required
      />

      {/* Password field with toggle */}
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border w-full px-3 py-2 border-gray-800 pr-10"
          placeholder="Password"
          required
        />
        {password &&<span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>}
      </div>

      {/* Extra options */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === 'Login' && (
          <p className="cursor-pointer">Forgot Password?</p>
        )}
      </div>

      {/* Submit button */}
      <button className="bg-black text-white font-light text-xs px-8 py-2 mt-4">
        {currentState}
      </button>

      {/* Switch between states */}
      {currentState === 'Sign Up' && (
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <span
            className="text-[#414141] cursor-pointer"
            onClick={() => setCurrentState('Login')}
          >
            Sign In
          </span>
        </p>
      )}

      {currentState === 'Login' && (
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <span
            className="text-[#414141] cursor-pointer"
            onClick={() => setCurrentState('Sign Up')}
          >
            Create one
          </span>
        </p>
      )}
    </form>
  );
};

export default Login;
