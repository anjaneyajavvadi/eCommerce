import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Title from '../components/Title';
import Orders from './Orders';

const Profile = () => {
    const {token,backendUrl}=useContext(ShopContext);
    const [profileData,setProfileData]=useState({});
    const getProfile=async()=>{
        try{
            const response = await axios.get(`${backendUrl}/api/user/profile`, {
              headers: { Authorization: `Bearer ${token}` }
            });

          if(response.data.success){
            setProfileData(response.data.user);
          }
          else{
            toast.error(response.data.message);
          }
        }catch(err){
          console.log(err);
        }
    }

    useEffect(()=>{
        getProfile();
    },[]);

  return (
    <div>
      <div className='px-3 flex flex-col gap-2'>
        <Title text1={'PRO'} text2={'FILE'}></Title>
        <div className='flex flex-col gap-2 '>
          <div className='flex flex-row gap-3'>
            <p className='font w-15'>Name:</p>
            <p className=''>{profileData.name}</p>
          </div>
          <div className='flex flex-row gap-3'>
            <p className='font w-15'>Email:</p>
            <p className=''>{profileData.email}</p>
          </div>
        </div>
        <div className='flex flex-row'>
          <p className='bg-black text-white px-2 py-1 mt-2'>Edit Profile</p>
        </div>
        <div className='border-t mt-10'></div>
      </div>
      <div className='flex flex-col gap-3 mt-4 px-3'>
        <Title text1={'SAVED'} text2={' ADDRESSES'}/>
      </div>
      <div className='flex flex-col gap-3 mt-4 px-3'>
        <Orders/>
      </div>
    </div>
  )
}

export default Profile