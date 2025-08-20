import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
const List = ({token}) => {
    
    const {currency,removeProduct,fetchList,list}=useContext(AdminContext);

    useEffect(()=>{
        fetchList();
    },[]);

  return (
    <>
        <p className='mb-2'>All Products</p>
        <div className='flex flex-col gap-2'>
            <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm'>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b className='text-center'>Action</b>
            </div>
            {
                list.map((item)=>{
                    return(
                        <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm border gap-2'>
                            <img src={item.image[0]} alt="" className='w-12 h-12 object-cover' />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{currency}{item.price}</p>
                            <p onClick={()=>removeProduct(item._id)} className='text-center'>X</p>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}

export default List